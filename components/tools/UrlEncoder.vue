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
const toolName = 'url_encoder'

function encodeText() {
  error.value = ''
  try {
    output.value = encodeURIComponent(input.value)
    trackToolEvent(toolName, 'url_encode')
  } catch {
    output.value = ''
    error.value = t('toolUi.url.encodeError')
    trackToolEvent(toolName, 'url_decode_error')
  }
}

function decodeText() {
  error.value = ''
  try {
    output.value = decodeURIComponent(input.value)
    trackToolEvent(toolName, 'url_decode')
  } catch {
    output.value = ''
    error.value = t('toolUi.url.decodeError')
    trackToolEvent(toolName, 'url_decode_error')
  }
}

function loadExample() {
  input.value = 'https://example.com/search?q=hello world&lang=en'
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
    <label class="field-label" for="url-input">{{ $t('toolUi.url.input') }}</label>
    <textarea id="url-input" v-model="input" class="textarea-input" :placeholder="$t('toolUi.url.placeholder')" />
    <div class="button-row">
      <button class="btn-primary" type="button" @click="encodeText">{{ $t('toolUi.url.encode') }}</button>
      <button class="btn-secondary" type="button" @click="decodeText">{{ $t('toolUi.url.decode') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>
    <p v-if="error" class="status-error">{{ error }}</p>
    <div class="mt-5">
      <label class="field-label" for="url-output">{{ $t('common.output') }}</label>
      <textarea id="url-output" v-model="output" class="textarea-input" readonly />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!output" @click="copyOutput">
          {{ copied ? $t('common.copied') : $t('common.copyOutput') }}
        </button>
      </div>
    </div>
  </div>
</template>
