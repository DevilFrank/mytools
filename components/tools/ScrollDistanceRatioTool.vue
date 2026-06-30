<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useCopy } from '~/composables/useCopy'
import { useTrackEvent } from '~/composables/useTrackEvent'

interface ScrollTarget {
  top: number
  exposureRate?: number
}

interface ThresholdTarget extends ScrollTarget {
  threshold: number
}

interface ScrollDistanceResult {
  minDistance: number
  maxDistance: number
  minRatio: number
  maxRatio: number
  minPercent: string
  maxPercent: string
  thresholds: ThresholdTarget[]
}

const form = reactive({
  viewportHeight: 932,
  pageHeight: 3000,
  divHeight: 280,
  visibleRatio: 0.5,
  minScrollCount: 3,
  maxScrollCount: 6,
})

const targetsInput = ref('200, 1.0\n1200, 0.8\n2700, 0.5')
const result = ref<ScrollDistanceResult | null>(null)
const error = ref('')
const { copied, copyText } = useCopy()
const { trackToolEvent } = useTrackEvent()
const { t } = useI18n()
const toolName = 'scroll_distance_ratio'

const formattedResult = computed(() => {
  return result.value ? JSON.stringify(result.value, null, 2) : ''
})

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function getScrollDistanceRatioRange({
  viewportHeight,
  pageHeight,
  divHeight,
  visibleRatio = 0.5,
  scrollCountRange = [3, 6],
  targets,
}: {
  viewportHeight: number
  pageHeight: number
  divHeight: number
  visibleRatio?: number
  scrollCountRange?: [number, number]
  targets: ScrollTarget[]
}): ScrollDistanceResult {
  const maxScrollTop = Math.max(0, pageHeight - viewportHeight)

  const [minCount, maxCount] = scrollCountRange

  const thresholds = targets
    .map((item) => {
      const threshold = item.top + divHeight * visibleRatio - viewportHeight

      return {
        ...item,
        threshold: clamp(threshold, 0, maxScrollTop),
      }
    })
    .sort((a, b) => a.threshold - b.threshold)

  const maxThreshold = Math.max(...thresholds.map((item) => item.threshold))

  const minDistance = maxThreshold / maxCount
  const maxDistance = maxScrollTop / minCount

  return {
    minDistance,
    maxDistance,
    minRatio: minDistance / viewportHeight,
    maxRatio: maxDistance / viewportHeight,
    minPercent: `${Math.round((minDistance / viewportHeight) * 100)}%`,
    maxPercent: `${Math.round((maxDistance / viewportHeight) * 100)}%`,
    thresholds,
  }
}

function parseTargets() {
  return targetsInput.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [topValue, exposureRateValue] = line.split(/[\s,]+/)
      const top = Number(topValue)
      const exposureRate = exposureRateValue === undefined || exposureRateValue === '' ? undefined : Number(exposureRateValue)

      if (!Number.isFinite(top)) {
        throw new Error(t('toolUi.scrollDistanceRatio.invalidTarget'))
      }

      if (exposureRate !== undefined && !Number.isFinite(exposureRate)) {
        throw new Error(t('toolUi.scrollDistanceRatio.invalidTarget'))
      }

      return exposureRate === undefined ? { top } : { top, exposureRate }
    })
}

function validateForm(targets: ScrollTarget[]) {
  const numericValues = [
    form.viewportHeight,
    form.pageHeight,
    form.divHeight,
    form.visibleRatio,
    form.minScrollCount,
    form.maxScrollCount,
  ]

  if (numericValues.some((value) => !Number.isFinite(Number(value)))) {
    throw new Error(t('toolUi.scrollDistanceRatio.invalidNumber'))
  }

  if (form.viewportHeight <= 0 || form.pageHeight <= 0 || form.divHeight <= 0) {
    throw new Error(t('toolUi.scrollDistanceRatio.positiveNumber'))
  }

  if (form.visibleRatio < 0 || form.visibleRatio > 1) {
    throw new Error(t('toolUi.scrollDistanceRatio.visibleRatioError'))
  }

  if (form.minScrollCount <= 0 || form.maxScrollCount <= 0 || form.minScrollCount > form.maxScrollCount) {
    throw new Error(t('toolUi.scrollDistanceRatio.scrollCountError'))
  }

  if (!targets.length) {
    throw new Error(t('toolUi.scrollDistanceRatio.emptyTargets'))
  }
}

function calculate(shouldTrack = false) {
  error.value = ''

  try {
    const targets = parseTargets()
    validateForm(targets)

    result.value = getScrollDistanceRatioRange({
      viewportHeight: Number(form.viewportHeight),
      pageHeight: Number(form.pageHeight),
      divHeight: Number(form.divHeight),
      visibleRatio: Number(form.visibleRatio),
      scrollCountRange: [Number(form.minScrollCount), Number(form.maxScrollCount)],
      targets,
    })
    if (shouldTrack) {
      trackToolEvent({ toolName, action: 'calculate_scroll_ratio' })
    }
  } catch (caughtError) {
    result.value = null
    error.value = caughtError instanceof Error ? caughtError.message : t('toolUi.scrollDistanceRatio.calculateError')
    if (shouldTrack) {
      trackToolEvent({ toolName, action: 'calculate_scroll_ratio_error' })
    }
  }
}

function calculateByClick() {
  calculate(true)
}

function loadExample() {
  form.viewportHeight = 932
  form.pageHeight = 3000
  form.divHeight = 280
  form.visibleRatio = 0.5
  form.minScrollCount = 3
  form.maxScrollCount = 6
  targetsInput.value = '200, 1.0\n1200, 0.8\n2700, 0.5'
  calculate()
  trackToolEvent({ toolName, action: 'load_example' })
}

function clearAll() {
  form.viewportHeight = 0
  form.pageHeight = 0
  form.divHeight = 0
  form.visibleRatio = 0.5
  form.minScrollCount = 3
  form.maxScrollCount = 6
  targetsInput.value = ''
  result.value = null
  error.value = ''
  trackToolEvent({ toolName, action: 'clear_input' })
}

async function copyResult() {
  await copyText(formattedResult.value)
  trackToolEvent({ toolName, action: 'copy_result' })
}

calculate()
</script>

<template>
  <div>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="field-label" for="scroll-viewport-height">{{ $t('toolUi.scrollDistanceRatio.viewportHeight') }}</label>
        <input id="scroll-viewport-height" v-model.number="form.viewportHeight" class="text-input" type="number" min="1" @input="calculate()">
      </div>
      <div>
        <label class="field-label" for="scroll-page-height">{{ $t('toolUi.scrollDistanceRatio.pageHeight') }}</label>
        <input id="scroll-page-height" v-model.number="form.pageHeight" class="text-input" type="number" min="1" @input="calculate()">
      </div>
      <div>
        <label class="field-label" for="scroll-div-height">{{ $t('toolUi.scrollDistanceRatio.divHeight') }}</label>
        <input id="scroll-div-height" v-model.number="form.divHeight" class="text-input" type="number" min="1" @input="calculate()">
      </div>
      <div>
        <label class="field-label" for="scroll-visible-ratio">{{ $t('toolUi.scrollDistanceRatio.visibleRatio') }}</label>
        <input id="scroll-visible-ratio" v-model.number="form.visibleRatio" class="text-input" type="number" min="0" max="1" step="0.1" @input="calculate()">
      </div>
      <div>
        <label class="field-label" for="scroll-min-count">{{ $t('toolUi.scrollDistanceRatio.minScrollCount') }}</label>
        <input id="scroll-min-count" v-model.number="form.minScrollCount" class="text-input" type="number" min="1" @input="calculate()">
      </div>
      <div>
        <label class="field-label" for="scroll-max-count">{{ $t('toolUi.scrollDistanceRatio.maxScrollCount') }}</label>
        <input id="scroll-max-count" v-model.number="form.maxScrollCount" class="text-input" type="number" min="1" @input="calculate()">
      </div>
    </div>

    <div class="mt-4">
      <label class="field-label" for="scroll-targets">{{ $t('toolUi.scrollDistanceRatio.targets') }}</label>
      <textarea
        id="scroll-targets"
        v-model="targetsInput"
        class="textarea-input min-h-32"
        spellcheck="false"
        :placeholder="$t('toolUi.scrollDistanceRatio.targetsPlaceholder')"
        @input="calculate()"
      />
      <p class="mt-2 text-sm text-slate-600">{{ $t('toolUi.scrollDistanceRatio.targetsHelp') }}</p>
    </div>

    <p v-if="error" class="status-error">{{ error }}</p>

    <div class="button-row">
      <button class="btn-primary" type="button" @click="calculateByClick">{{ $t('toolUi.scrollDistanceRatio.calculate') }}</button>
      <button class="btn-secondary" type="button" @click="loadExample">{{ $t('common.loadExample') }}</button>
      <button class="btn-secondary" type="button" @click="clearAll">{{ $t('common.clear') }}</button>
    </div>

    <div v-if="result" class="mt-5 space-y-5">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-md border border-slate-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ $t('toolUi.scrollDistanceRatio.minPercent') }}</p>
          <p class="mt-2 text-2xl font-semibold text-slate-950">{{ result.minPercent }}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ $t('toolUi.scrollDistanceRatio.maxPercent') }}</p>
          <p class="mt-2 text-2xl font-semibold text-slate-950">{{ result.maxPercent }}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ $t('toolUi.scrollDistanceRatio.minDistance') }}</p>
          <p class="mt-2 text-2xl font-semibold text-slate-950">{{ result.minDistance.toFixed(2) }}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ $t('toolUi.scrollDistanceRatio.maxDistance') }}</p>
          <p class="mt-2 text-2xl font-semibold text-slate-950">{{ result.maxDistance.toFixed(2) }}</p>
        </div>
      </div>

      <div class="overflow-x-auto rounded-md border border-slate-200 bg-white">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-left text-slate-600">
            <tr>
              <th class="px-3 py-2 font-semibold">{{ $t('toolUi.scrollDistanceRatio.top') }}</th>
              <th class="px-3 py-2 font-semibold">{{ $t('toolUi.scrollDistanceRatio.exposureRate') }}</th>
              <th class="px-3 py-2 font-semibold">{{ $t('toolUi.scrollDistanceRatio.threshold') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-800">
            <tr v-for="target in result.thresholds" :key="`${target.top}-${target.threshold}`">
              <td class="px-3 py-2">{{ target.top }}</td>
              <td class="px-3 py-2">{{ target.exposureRate ?? '-' }}</td>
              <td class="px-3 py-2">{{ target.threshold.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <label class="field-label" for="scroll-output">{{ $t('common.output') }}</label>
        <textarea id="scroll-output" :value="formattedResult" class="textarea-input min-h-72" readonly spellcheck="false" />
        <div class="button-row">
          <button class="btn-secondary" type="button" @click="copyResult">
            {{ copied ? $t('common.copied') : $t('common.copyResult') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
