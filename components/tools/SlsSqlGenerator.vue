<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

interface FieldDictionaryItem {
  field: string
  type: 'string' | 'number' | 'json'
  required: boolean
  description: string
  example: string
}

interface GenerateResponse {
  success: boolean
  message?: string
  data?: {
    sql: string
    intent: string
    parsed: unknown
    explanation: string
    warnings: string[]
    fieldDescriptions: string[]
    llmTrace?: {
      provider: 'deepseek'
      model: string
      baseUrl: string
      messages: Array<{
        role: 'system' | 'user' | 'assistant'
        content: string
      }>
      responseContent: string
      reasoningContent?: string
      finishReason?: string
      usage?: {
        promptTokens?: number
        completionTokens?: number
        totalTokens?: number
      }
    }
  }
}

const copy = {
  zh: {
    title: '自然语言转阿里云 SLS SQL',
    inputLabel: '查询需求',
    inputPlaceholder: '例如：查询 su 是 https://www.fpffz.top/?channel=news01 的数据，按 type 和 trackType 分组显示',
    defaultLimit: '默认明细条数',
    suMatchMode: 'su 匹配方式',
    like: 'LIKE 包含',
    exact: '等于',
    generate: '生成 SQL',
    loadExample: '加载示例',
    clear: '清空',
    copySql: '复制 SQL',
    copied: '已复制',
    sqlOutput: 'SQL 结果',
    sqlPlaceholder: '生成后的 SQL 会显示在这里',
    parsedJson: '解析结果 JSON',
    parsedPlaceholder: '解析后的 JSON 会显示在这里',
    explanation: '说明',
    noExplanation: '暂无说明',
    fieldNotes: '字段说明',
    warnings: '注意事项',
    fieldDictionary: '字段字典',
    field: '字段',
    type: '类型',
    required: '必填',
    description: '说明',
    example: '示例',
    llmTrace: '模型对话过程',
    rawResponse: '模型原始返回',
    reasoning: 'Reasoning',
    yes: '是',
    no: '否',
    emptyInput: '请输入查询需求。',
    requestFailed: '请求失败。',
    fieldsFailed: '字段字典加载失败。',
  },
  en: {
    title: 'Natural language to Aliyun SLS SQL',
    inputLabel: 'Query request',
    inputPlaceholder: 'Example: query logs where su is https://www.fpffz.top/?channel=news01, grouped by type and trackType',
    defaultLimit: 'Default detail limit',
    suMatchMode: 'su match mode',
    like: 'LIKE contains',
    exact: 'Equals',
    generate: 'Generate SQL',
    loadExample: 'Load example',
    clear: 'Clear',
    copySql: 'Copy SQL',
    copied: 'Copied',
    sqlOutput: 'SQL result',
    sqlPlaceholder: 'Generated SQL will appear here',
    parsedJson: 'Parsed JSON',
    parsedPlaceholder: 'Parsed JSON will appear here',
    explanation: 'Explanation',
    noExplanation: 'No explanation yet',
    fieldNotes: 'Field notes',
    warnings: 'Warnings',
    fieldDictionary: 'Field dictionary',
    field: 'Field',
    type: 'Type',
    required: 'Required',
    description: 'Description',
    example: 'Example',
    llmTrace: 'Model trace',
    rawResponse: 'Raw model response',
    reasoning: 'Reasoning',
    yes: 'Yes',
    no: 'No',
    emptyInput: 'Enter a query request.',
    requestFailed: 'Request failed.',
    fieldsFailed: 'Failed to load field dictionary.',
  },
}

const { locale } = useI18n()
const labels = computed(() => locale.value === 'zh-CN' ? copy.zh : copy.en)
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()

const input = ref('')
const defaultLimit = ref(1000)
const suMatchMode = ref<'like' | '='>('like')
const loading = ref(false)
const error = ref('')
const fieldsError = ref('')
const result = ref<GenerateResponse['data'] | null>(null)
const fields = ref<FieldDictionaryItem[]>([])
const toolName = 'sls_sql_generator'

const formattedParsed = computed(() => {
  if (!result.value?.parsed) {
    return labels.value.parsedPlaceholder
  }

  return JSON.stringify(result.value.parsed, null, 2)
})

const traceUsage = computed(() => {
  const usage = result.value?.llmTrace?.usage
  if (!usage) return ''

  return [
    `Prompt: ${usage.promptTokens ?? '-'}`,
    `Completion: ${usage.completionTokens ?? '-'}`,
    `Total: ${usage.totalTokens ?? '-'}`,
  ].join(' / ')
})

onMounted(async () => {
  try {
    const payload = await $fetch<{ data?: FieldDictionaryItem[] }>('/api/sql/fields')
    fields.value = payload.data ?? []
  } catch {
    fieldsError.value = labels.value.fieldsFailed
  }
})

async function handleGenerate() {
  if (!input.value.trim()) {
    error.value = labels.value.emptyInput
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch<GenerateResponse>('/api/sql/generate', {
      method: 'POST',
      body: {
        input: input.value.trim(),
        options: {
          defaultLimit: Number(defaultLimit.value) || 1000,
          suMatchMode: suMatchMode.value,
        },
      },
    })

    if (!response.success || !response.data) {
      result.value = null
      error.value = response.message ?? labels.value.requestFailed
      return
    }

    result.value = response.data
    trackToolEvent({ toolName, action: 'sls_sql_generate' })
  } catch (err) {
    result.value = null
    error.value = getErrorMessage(err)
  } finally {
    loading.value = false
  }
}

function loadExample() {
  input.value = '查询 su 是 https://www.fpffz.top/?channel=news01，有 6-1 没有 7-1，返回 6-1 的 actionValue、11-5 的 data、11-10 的 data'
  defaultLimit.value = 1000
  suMatchMode.value = 'like'
  error.value = ''
  trackToolEvent({ toolName, action: 'load_example' })
}

function clearAll() {
  input.value = ''
  defaultLimit.value = 1000
  suMatchMode.value = 'like'
  error.value = ''
  result.value = null
  trackToolEvent({ toolName, action: 'clear_input' })
}

async function copySql() {
  if (!result.value?.sql) return

  await copyText(result.value.sql)
  trackToolEvent({ toolName, action: 'copy_result' })
}

function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'data' in err) {
    const data = (err as { data?: { message?: string } }).data
    if (data?.message) return data.message
  }

  return err instanceof Error ? err.message : labels.value.requestFailed
}
</script>

<template>
  <div class="space-y-5">
    <div class="space-y-4">
      <div>
        <label class="field-label" for="sls-natural-input">{{ labels.inputLabel }}</label>
        <textarea
          id="sls-natural-input"
          v-model="input"
          class="textarea-input min-h-36"
          :placeholder="labels.inputPlaceholder"
          spellcheck="false"
        />
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="field-label" for="sls-default-limit">{{ labels.defaultLimit }}</label>
          <input
            id="sls-default-limit"
            v-model.number="defaultLimit"
            class="text-input"
            type="number"
            min="1"
            max="100000"
          >
        </div>
        <div>
          <label class="field-label" for="sls-su-match-mode">{{ labels.suMatchMode }}</label>
          <select id="sls-su-match-mode" v-model="suMatchMode" class="text-input">
            <option value="like">{{ labels.like }}</option>
            <option value="=">{{ labels.exact }}</option>
          </select>
        </div>
      </div>

      <p v-if="error" class="status-error">{{ error }}</p>

      <div class="button-row">
        <button class="btn-primary disabled:cursor-not-allowed disabled:bg-blue-300" type="button" :disabled="loading" @click="handleGenerate">
          {{ loading ? `${labels.generate}...` : labels.generate }}
        </button>
        <button class="btn-secondary" type="button" @click="loadExample">{{ labels.loadExample }}</button>
        <button class="btn-secondary" type="button" @click="clearAll">{{ labels.clear }}</button>
      </div>
    </div>

    <section class="border-t border-slate-200 pt-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.sqlOutput }}</h3>
          <p v-if="result?.intent" class="mt-1 text-sm text-slate-600">Intent: {{ result.intent }}</p>
        </div>
        <button class="btn-secondary" type="button" :disabled="!result?.sql" @click="copySql">
          {{ copied ? labels.copied : labels.copySql }}
        </button>
      </div>
      <textarea
        class="textarea-input min-h-72"
        :value="result?.sql || labels.sqlPlaceholder"
        readonly
        spellcheck="false"
      />
    </section>

    <div class="grid gap-5 lg:grid-cols-2">
      <section class="border-t border-slate-200 pt-5">
        <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.parsedJson }}</h3>
        <pre class="mt-2 max-h-96 overflow-auto rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-900">{{ formattedParsed }}</pre>
      </section>

      <section class="border-t border-slate-200 pt-5">
        <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.explanation }}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-700">{{ result?.explanation || labels.noExplanation }}</p>

        <div v-if="result?.fieldDescriptions?.length" class="mt-4">
          <h4 class="text-sm font-semibold text-slate-900">{{ labels.fieldNotes }}</h4>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
            <li v-for="item in result.fieldDescriptions" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>

    <section v-if="result?.warnings?.length" class="border-t border-slate-200 pt-5">
      <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.warnings }}</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="warning in result.warnings" :key="warning" class="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {{ warning }}
        </li>
      </ul>
    </section>

    <section class="border-t border-slate-200 pt-5">
      <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.fieldDictionary }}</h3>
      <p v-if="fieldsError" class="status-error">{{ fieldsError }}</p>
      <div class="mt-3 max-h-80 overflow-auto rounded-md border border-slate-200 bg-white">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="sticky top-0 bg-slate-50 text-left text-slate-700">
            <tr>
              <th class="px-3 py-2 font-semibold">{{ labels.field }}</th>
              <th class="px-3 py-2 font-semibold">{{ labels.type }}</th>
              <th class="px-3 py-2 font-semibold">{{ labels.required }}</th>
              <th class="px-3 py-2 font-semibold">{{ labels.description }}</th>
              <th class="px-3 py-2 font-semibold">{{ labels.example }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="field in fields" :key="field.field">
              <td class="whitespace-nowrap px-3 py-2 font-mono text-slate-900">{{ field.field }}</td>
              <td class="whitespace-nowrap px-3 py-2 text-slate-700">{{ field.type }}</td>
              <td class="whitespace-nowrap px-3 py-2 text-slate-700">{{ field.required ? labels.yes : labels.no }}</td>
              <td class="min-w-72 px-3 py-2 text-slate-700">{{ field.description }}</td>
              <td class="whitespace-nowrap px-3 py-2 font-mono text-slate-600">{{ field.example }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="result?.llmTrace" class="border-t border-slate-200 pt-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold tracking-normal text-slate-950">{{ labels.llmTrace }}</h3>
          <p class="mt-1 text-sm text-slate-600">
            {{ result.llmTrace.provider }} / {{ result.llmTrace.model }} / {{ result.llmTrace.finishReason || 'unknown' }}
          </p>
        </div>
        <p v-if="traceUsage" class="text-sm text-slate-600">{{ traceUsage }}</p>
      </div>

      <div class="mt-3 space-y-3">
        <div v-for="(message, index) in result.llmTrace.messages" :key="`${message.role}-${index}`">
          <div class="text-xs font-semibold uppercase tracking-normal text-slate-500">{{ message.role }}</div>
          <pre class="mt-1 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-900">{{ message.content }}</pre>
        </div>
      </div>

      <div class="mt-4">
        <h4 class="text-sm font-semibold text-slate-900">{{ labels.rawResponse }}</h4>
        <pre class="mt-2 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-900">{{ result.llmTrace.responseContent }}</pre>
      </div>

      <div v-if="result.llmTrace.reasoningContent" class="mt-4">
        <h4 class="text-sm font-semibold text-slate-900">{{ labels.reasoning }}</h4>
        <pre class="mt-2 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-900">{{ result.llmTrace.reasoningContent }}</pre>
      </div>
    </section>
  </div>
</template>
