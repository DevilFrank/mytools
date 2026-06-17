<script setup lang="ts">
import { ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

const input = ref('')
const output = ref('')
const error = ref('')
const message = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'json_formatter'

const exampleJson = JSON.stringify(
  {
    name: 'Free Online Tools',
    features: ['format JSON', 'validate JSON', 'minify JSON'],
    localProcessing: true,
  },
  null,
  2,
)

function parseInput() {
  error.value = ''
  message.value = ''

  if (!input.value.trim()) {
    throw new Error(t('toolUi.json.emptyError'))
  }

  return JSON.parse(input.value)
}

function formatJson() {
  try {
    output.value = JSON.stringify(parseInput(), null, 2)
    message.value = t('toolUi.json.formatted')
    trackToolEvent(toolName, 'json_format')
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('toolUi.json.invalidError')
    trackToolEvent(toolName, 'json_format_error')
  }
}

function minifyJson() {
  try {
    output.value = JSON.stringify(parseInput())
    message.value = t('toolUi.json.minified')
    trackToolEvent(toolName, 'json_minify')
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('toolUi.json.invalidError')
    trackToolEvent(toolName, 'json_minify_error')
  }
}

function validateJson() {
  try {
    parseInput()
    output.value = ''
    message.value = t('toolUi.json.valid')
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('toolUi.json.invalidError')
  }
}

function clearInput() {
  input.value = ''
  output.value = ''
  error.value = ''
  message.value = ''
  trackToolEvent(toolName, 'clear_input')
}

function loadExample() {
  input.value = exampleJson
  output.value = ''
  error.value = ''
  message.value = t('toolUi.json.exampleLoaded')
  trackToolEvent(toolName, 'load_example')
}

async function copyOutput() {
  await copyText(output.value)
  trackToolEvent(toolName, 'copy_result')
}
</script>

<template>
  <div>
    <label class="field-label" for="json-input">{{ $t('toolUi.json.input') }}</label>
    <textarea id="json-input" v-model="input" class="textarea-input" spellcheck="false" :placeholder="$t('toolUi.json.placeholder')" />

    <div class="button-row" :aria-label="$t('toolUi.json.actions')">
      <button class="btn-primary" type="button" @click="formatJson">{{ $t('toolUi.json.format') }}</button>
      <button class="btn-secondary" type="button" @click="minifyJson">{{ $t('toolUi.json.minify') }}</button>
      <button class="btn-secondary" type="button" @click="validateJson">{{ $t('toolUi.json.validate') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearInput">{{ $t('common.clear') }}</button>
    </div>

    <p v-if="error" class="status-error">{{ error }}</p>
    <p v-if="message" class="status-success">{{ message }}</p>

    <div class="mt-5">
      <label class="field-label" for="json-output">{{ $t('common.output') }}</label>
      <textarea id="json-output" v-model="output" class="textarea-input" readonly spellcheck="false" :placeholder="$t('toolUi.json.outputPlaceholder')" />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!output" @click="copyOutput">
          {{ copied ? $t('common.copied') : $t('common.copyOutput') }}
        </button>
      </div>
    </div>
  </div>
</template>
