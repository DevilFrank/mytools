<script setup lang="ts">
import { ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

const timestampInput = ref('')
const dateInput = ref('')
const result = ref('')
const error = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'timestamp_converter'

function timestampToDate() {
  error.value = ''
  result.value = ''
  const raw = timestampInput.value.trim()

  if (!/^\d{10}$|^\d{13}$/.test(raw)) {
    error.value = t('toolUi.timestamp.timestampError')
    return
  }

  const milliseconds = raw.length === 10 ? Number(raw) * 1000 : Number(raw)
  const date = new Date(milliseconds)

  if (Number.isNaN(date.getTime())) {
    error.value = t('toolUi.timestamp.invalidTimestamp')
    return
  }

  result.value = [
    `${t('toolUi.timestamp.unit')}: ${raw.length === 10 ? t('toolUi.timestamp.secondsUnit') : t('toolUi.timestamp.millisecondsUnit')}`,
    `${t('toolUi.timestamp.localTime')}: ${date.toLocaleString()}`,
    `${t('toolUi.timestamp.utcTime')}: ${date.toISOString()}`,
    `${t('toolUi.timestamp.seconds')}: ${Math.floor(milliseconds / 1000)}`,
    `${t('toolUi.timestamp.milliseconds')}: ${milliseconds}`,
  ].join('\n')
  trackToolEvent({ toolName, action: 'timestamp_to_date' })
}

function dateToTimestamp() {
  error.value = ''
  result.value = ''

  if (!dateInput.value) {
    error.value = t('toolUi.timestamp.dateRequired')
    return
  }

  const date = new Date(dateInput.value)

  if (Number.isNaN(date.getTime())) {
    error.value = t('toolUi.timestamp.invalidDate')
    return
  }

  result.value = [
    `${t('toolUi.timestamp.localTime')}: ${date.toLocaleString()}`,
    `${t('toolUi.timestamp.utcTime')}: ${date.toISOString()}`,
    `${t('toolUi.timestamp.seconds')}: ${Math.floor(date.getTime() / 1000)}`,
    `${t('toolUi.timestamp.milliseconds')}: ${date.getTime()}`,
  ].join('\n')
  trackToolEvent({ toolName, action: 'date_to_timestamp' })
}

function loadExample() {
  timestampInput.value = '1704067200'
  dateInput.value = '2024-01-01T00:00'
  error.value = ''
  result.value = t('toolUi.timestamp.exampleLoaded')
  trackToolEvent({ toolName, action: 'load_example' })
}

function clearAll() {
  timestampInput.value = ''
  dateInput.value = ''
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
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="field-label" for="timestamp-input">{{ $t('toolUi.timestamp.timestampLabel') }}</label>
        <input id="timestamp-input" v-model="timestampInput" class="text-input" inputmode="numeric" placeholder="1704067200 or 1704067200000">
        <button class="btn-primary mt-3" type="button" @click="timestampToDate">{{ $t('toolUi.timestamp.toDate') }}</button>
      </div>
      <div>
        <label class="field-label" for="date-input">{{ $t('toolUi.timestamp.dateLabel') }}</label>
        <input id="date-input" v-model="dateInput" class="text-input" type="datetime-local">
        <button class="btn-primary mt-3" type="button" @click="dateToTimestamp">{{ $t('toolUi.timestamp.toTimestamp') }}</button>
      </div>
    </div>
    <div class="button-row">
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>
    <p v-if="error" class="status-error">{{ error }}</p>
    <div class="mt-5">
      <label class="field-label" for="timestamp-output">{{ $t('common.result') }}</label>
      <textarea id="timestamp-output" v-model="result" class="textarea-input" readonly />
      <div class="button-row">
        <button class="btn-secondary" type="button" :disabled="!result" @click="copyResult">
          {{ copied ? $t('common.copied') : $t('common.copyResult') }}
        </button>
      </div>
    </div>
  </div>
</template>
