<script setup lang="ts">
import { ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

interface ParsedUA {
  browser: string
  os: string
  deviceType: string
  engine: string
}

const input = ref('')
const result = ref('')
const error = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'user_agent_parser'

const exampleUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

function parseBrowser(ua: string) {
  if (/Edg\//.test(ua)) return 'Microsoft Edge'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'Chrome'
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari'
  return 'Unknown'
}

function parseOs(ua: string) {
  if (/Android/.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  if (/Windows NT/.test(ua)) return 'Windows'
  if (/Mac OS X/.test(ua)) return 'macOS'
  if (/Linux/.test(ua)) return 'Linux'
  return 'Unknown'
}

function parseDeviceType(ua: string) {
  if (/iPad|Tablet/.test(ua)) return 'Tablet'
  if (/Mobi|Android|iPhone|iPod/.test(ua)) return 'Mobile'
  return 'Desktop'
}

function parseEngine(ua: string) {
  if (/AppleWebKit/.test(ua) && /Chrome|Edg/.test(ua)) return 'Blink'
  if (/AppleWebKit/.test(ua)) return 'WebKit'
  if (/Gecko\//.test(ua) && /Firefox\//.test(ua)) return 'Gecko'
  return 'Unknown'
}

function parseUserAgent() {
  error.value = ''
  result.value = ''
  const ua = input.value.trim()

  if (!ua) {
    error.value = t('toolUi.ua.emptyError')
    return
  }

  const parsed: ParsedUA = {
    browser: parseBrowser(ua),
    os: parseOs(ua),
    deviceType: parseDeviceType(ua),
    engine: parseEngine(ua),
  }

  result.value = JSON.stringify(parsed, null, 2)
  trackToolEvent({ toolName, action: 'ua_parse' })
}

function loadExample() {
  input.value = exampleUa
  result.value = ''
  error.value = ''
  trackToolEvent({ toolName, action: 'load_example' })
}

function clearAll() {
  input.value = ''
  result.value = ''
  error.value = ''
  trackToolEvent({ toolName, action: 'clear_input' })
}

async function copyResult() {
  await copyText(result.value)
  trackToolEvent({ toolName, action: 'copy_result' })
}
</script>

<template>
  <div>
    <label class="field-label" for="ua-input">{{ $t('toolUi.ua.input') }}</label>
    <textarea id="ua-input" v-model="input" class="textarea-input" :placeholder="$t('toolUi.ua.placeholder')" />
    <div class="button-row">
      <button class="btn-primary" type="button" @click="parseUserAgent">{{ $t('toolUi.ua.parse') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>
    <p v-if="error" class="status-error">{{ error }}</p>
    <div class="mt-5">
      <label class="field-label" for="ua-output">{{ $t('toolUi.ua.result') }}</label>
      <textarea id="ua-output" v-model="result" class="textarea-input" readonly />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!result" @click="copyResult">
          {{ copied ? $t('common.copied') : $t('common.copyResult') }}
        </button>
      </div>
    </div>
  </div>
</template>
