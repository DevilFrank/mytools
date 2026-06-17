<script setup lang="ts">
import RelatedTools from '~/components/layout/RelatedTools.vue'
import TimestampConverter from '~/components/tools/TimestampConverter.vue'
import { useSeo } from '~/composables/useSeo'
import { getToolById } from '~/data/tools'

const tool = getToolById('timestamp-converter')!
const { t } = useI18n()
const howToUseKeys = [
  'pages.toolPages.timestampConverter.howToUse[0]',
  'pages.toolPages.timestampConverter.howToUse[1]',
]
const faqKeys = [
  'pages.toolPages.timestampConverter.faq[0]',
  'pages.toolPages.timestampConverter.faq[1]',
  'pages.toolPages.timestampConverter.faq[2]',
]

useSeo({
  title: t('pages.toolPages.timestampConverter.seoTitle'),
  description: t('pages.toolPages.timestampConverter.seoDescription'),
  path: tool.path,
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <header>
        <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolPages.timestampConverter.h1') }}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          {{ $t('pages.toolPages.timestampConverter.intro') }}
        </p>
      </header>

      <section class="tool-panel" aria-labelledby="timestamp-tool-heading">
        <h2 id="timestamp-tool-heading" class="section-title">{{ $t('pages.toolPages.timestampConverter.toolHeading') }}</h2>
        <TimestampConverter />
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.howToUse') }}</h2>
        <p v-for="paragraphKey in howToUseKeys" :key="paragraphKey">{{ $t(paragraphKey) }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.example') }}</h2>
        <p>
          {{ $t('pages.toolPages.timestampConverter.example') }}
        </p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.faq') }}</h2>
        <div class="space-y-4">
          <div v-for="faqKey in faqKeys" :key="faqKey">
            <h3 class="font-semibold text-slate-950">{{ $t(`${faqKey}.q`) }}</h3>
            <p>{{ $t(`${faqKey}.a`) }}</p>
          </div>
        </div>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.privacyNote') }}</h2>
        <p>{{ $t('pages.toolPages.timestampConverter.privacy') }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.relatedTools') }}</h2>
        <RelatedTools :current-tool="tool" />
      </section>
    </div>
  </article>
</template>
