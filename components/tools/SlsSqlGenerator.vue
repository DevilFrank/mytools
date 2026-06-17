<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

interface SlsSqlForm {
  sourceUrl?: string
  step?: string
  type?: string
  trackType?: string
  groupBy?: string
  timeBucket?: '10s' | '1m' | '5m' | '1h'
  limit?: number
}

const form = reactive<SlsSqlForm>({
  sourceUrl: '',
  step: '',
  type: '',
  trackType: '',
  groupBy: 'trackId',
  timeBucket: '1m',
  limit: 100,
})

const template = ref('pv-minute')
const sql = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'sls_sql_generator'

function sqlString(value?: string) {
  return String(value || '').replace(/'/g, "''")
}

function sqlValue(value?: string) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  return /^-?\d+(\.\d+)?$/.test(raw) ? raw : `'${sqlString(raw)}'`
}

function buildWhere() {
  const clauses: string[] = []

  if (form.sourceUrl?.trim()) clauses.push(`su LIKE '%${sqlString(form.sourceUrl)}%'`)
  if (form.step?.trim()) clauses.push(`step = ${sqlValue(form.step)}`)
  if (form.type?.trim()) clauses.push(`type = ${sqlValue(form.type)}`)
  if (form.trackType?.trim()) clauses.push(`trackType = ${sqlValue(form.trackType)}`)

  return clauses.length ? `WHERE ${clauses.join('\n  AND ')}` : ''
}

function bucketSeconds() {
  const mapping = {
    '10s': 10,
    '1m': 60,
    '5m': 300,
    '1h': 3600,
  }

  return mapping[form.timeBucket || '1m']
}

function generateSql() {
  const limit = Math.max(1, Number(form.limit || 100))
  const where = buildWhere()
  const groupBy = form.groupBy?.trim() || 'trackId'

  if (template.value === 'pv-minute') {
    sql.value = `*
| SELECT
  date_format(from_unixtime(__time__ - __time__ % 60), '%Y-%m-%d %H:%i:%s') AS time_bucket,
  COUNT(*) AS pv
FROM log
${where}
GROUP BY time_bucket
ORDER BY time_bucket
LIMIT ${limit}`
    return
  }

  if (template.value === 'time-bucket') {
    const seconds = bucketSeconds()
    sql.value = `*
| SELECT
  date_format(from_unixtime(__time__ - __time__ % ${seconds}), '%Y-%m-%d %H:%i:%s') AS time_bucket,
  COUNT(*) AS pv
FROM log
${where}
GROUP BY time_bucket
ORDER BY time_bucket
LIMIT ${limit}`
    return
  }

  if (template.value === 'group-by') {
    sql.value = `*
| SELECT
  ${groupBy},
  COUNT(*) AS count
FROM log
${where}
GROUP BY ${groupBy}
ORDER BY count DESC
LIMIT ${limit}`
    return
  }

  if (template.value === 'filter-list') {
    sql.value = `*
| SELECT *
FROM log
${where}
LIMIT ${limit}`
    return
  }

  if (template.value === 'track-id') {
    sql.value = `*
| SELECT
  trackId,
  COUNT(*) AS events
FROM log
${where}
GROUP BY trackId
ORDER BY events DESC
LIMIT ${limit}`
    return
  }

  sql.value = `*
| SELECT
    trackId,
    arbitrary(
      CASE
        WHEN type = 6 AND trackType = 1 THEN actionValue
        ELSE NULL
      END
    ) AS actionValue
FROM log
${form.sourceUrl?.trim() ? `WHERE su LIKE '%${sqlString(form.sourceUrl)}%'` : ''}
GROUP BY trackId
HAVING
    SUM(CASE WHEN type = 6 AND trackType = 1 THEN 1 ELSE 0 END) > 0
    AND
    SUM(CASE WHEN type = 7 AND trackType = 1 THEN 1 ELSE 0 END) = 0
LIMIT ${limit}`
}

function generateSqlByClick() {
  generateSql()
  trackToolEvent({ toolName, action: 'sls_sql_generate' })
}

function loadExample() {
  form.sourceUrl = '/checkout'
  form.step = ''
  form.type = '6'
  form.trackType = '1'
  form.groupBy = 'trackId'
  form.timeBucket = '10s'
  form.limit = 100
  template.value = 'missing-b'
  generateSql()
  trackToolEvent({ toolName, action: 'load_example' })
}

function clearAll() {
  form.sourceUrl = ''
  form.step = ''
  form.type = ''
  form.trackType = ''
  form.groupBy = 'trackId'
  form.timeBucket = '1m'
  form.limit = 100
  template.value = 'pv-minute'
  sql.value = ''
  trackToolEvent({ toolName, action: 'clear_input' })
}

async function copySql() {
  await copyText(sql.value)
  trackToolEvent({ toolName, action: 'copy_result' })
}

generateSql()
</script>

<template>
  <div>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="field-label" for="sls-template">{{ $t('toolUi.sls.template') }}</label>
        <select id="sls-template" v-model="template" class="text-input" @change="generateSql">
          <option value="pv-minute">{{ $t('toolUi.sls.templates.pvMinute') }}</option>
          <option value="time-bucket">{{ $t('toolUi.sls.templates.timeBucket') }}</option>
          <option value="group-by">{{ $t('toolUi.sls.templates.groupBy') }}</option>
          <option value="filter-list">{{ $t('toolUi.sls.templates.filterList') }}</option>
          <option value="track-id">{{ $t('toolUi.sls.templates.trackId') }}</option>
          <option value="missing-b">{{ $t('toolUi.sls.templates.missingB') }}</option>
        </select>
      </div>
      <div>
        <label class="field-label" for="sls-source-url">{{ $t('toolUi.sls.sourceUrl') }}</label>
        <input id="sls-source-url" v-model="form.sourceUrl" class="text-input" placeholder="/checkout" @input="generateSql">
      </div>
      <div>
        <label class="field-label" for="sls-type">{{ $t('toolUi.sls.type') }}</label>
        <input id="sls-type" v-model="form.type" class="text-input" placeholder="6" @input="generateSql">
      </div>
      <div>
        <label class="field-label" for="sls-track-type">{{ $t('toolUi.sls.trackType') }}</label>
        <input id="sls-track-type" v-model="form.trackType" class="text-input" placeholder="1" @input="generateSql">
      </div>
      <div>
        <label class="field-label" for="sls-step">{{ $t('toolUi.sls.step') }}</label>
        <input id="sls-step" v-model="form.step" class="text-input" placeholder="pay" @input="generateSql">
      </div>
      <div>
        <label class="field-label" for="sls-group-by">{{ $t('toolUi.sls.groupBy') }}</label>
        <input id="sls-group-by" v-model="form.groupBy" class="text-input" placeholder="trackId" @input="generateSql">
      </div>
      <div>
        <label class="field-label" for="sls-time-bucket">{{ $t('toolUi.sls.timeBucket') }}</label>
        <select id="sls-time-bucket" v-model="form.timeBucket" class="text-input" @change="generateSql">
          <option value="10s">{{ $t('toolUi.sls.timeBuckets.10s') }}</option>
          <option value="1m">{{ $t('toolUi.sls.timeBuckets.1m') }}</option>
          <option value="5m">{{ $t('toolUi.sls.timeBuckets.5m') }}</option>
          <option value="1h">{{ $t('toolUi.sls.timeBuckets.1h') }}</option>
        </select>
      </div>
      <div>
        <label class="field-label" for="sls-limit">{{ $t('toolUi.sls.limit') }}</label>
        <input id="sls-limit" v-model.number="form.limit" class="text-input" type="number" min="1" max="10000" @input="generateSql">
      </div>
    </div>

    <p class="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      {{ $t('toolUi.sls.notice') }}
    </p>

    <div class="button-row">
      <button class="btn-primary" type="button" @click="generateSqlByClick">{{ $t('toolUi.sls.generate') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>

    <div class="mt-5">
      <label class="field-label" for="sls-output">{{ $t('toolUi.sls.output') }}</label>
      <textarea id="sls-output" v-model="sql" class="textarea-input min-h-72" readonly spellcheck="false" />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!sql" @click="copySql">
          {{ copied ? $t('common.copied') : $t('common.copySql') }}
        </button>
      </div>
    </div>
  </div>
</template>
