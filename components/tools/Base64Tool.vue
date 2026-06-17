<script setup lang="ts">
import { ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

const input = ref('')
const output = ref('')
const error = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'base64'

function encodeBase64(inputText: string) {
  return btoa(unescape(encodeURIComponent(inputText)))
}

function decodeBase64(inputText: string) {
  return decodeURIComponent(escape(atob(inputText)))
}

function encodeText() {
  error.value = ''
  try {
    output.value = encodeBase64(input.value)
    trackToolEvent(toolName, 'base64_encode')
  } catch {
    output.value = ''
    error.value = t('toolUi.base64.encodeError')
  }
}

function decodeText() {
  error.value = ''
  try {
    output.value = decodeBase64(input.value.trim())
    trackToolEvent(toolName, 'base64_decode')
  } catch {
    output.value = ''
    error.value = t('toolUi.base64.decodeError')
    trackToolEvent(toolName, 'base64_decode_error')
  }
}

function loadExample() {
  input.value = 'Hello, 世界'
  output.value = ''
  error.value = ''
  trackToolEvent(toolName, 'load_example')
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  trackToolEvent(toolName, 'clear_input')
}

async function copyOutput() {
  await copyText(output.value)
  trackToolEvent(toolName, 'copy_result')
}
</script>

<template>
  <div>
    <label class="field-label" for="base64-input">{{ $t('toolUi.base64.input') }}</label>
    <textarea id="base64-input" v-model="input" class="textarea-input" :placeholder="$t('toolUi.base64.placeholder')" />
    <div class="button-row">
      <button class="btn-primary" type="button" @click="encodeText">{{ $t('toolUi.base64.encode') }}</button>
      <button class="btn-secondary" type="button" @click="decodeText">{{ $t('toolUi.base64.decode') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>
    <p v-if="error" class="status-error">{{ error }}</p>
    <div class="mt-5">
      <label class="field-label" for="base64-output">{{ $t('common.output') }}</label>
      <textarea id="base64-output" v-model="output" class="textarea-input" readonly />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!output" @click="copyOutput">
          {{ copied ? $t('common.copied') : $t('common.copyOutput') }}
        </button>
      </div>
    </div>
  </div>
</template>
