<script setup lang="ts">
import RelatedTools from '~/components/layout/RelatedTools.vue'
import ScrollDistanceRatioTool from '~/components/tools/ScrollDistanceRatioTool.vue'
import { useSeo } from '~/composables/useSeo'
import { getToolById } from '~/data/tools'

const tool = getToolById('scroll-distance-ratio')!
const { t } = useI18n()
const howToUseKeys = [
  'pages.toolPages.scrollDistanceRatio.howToUse[0]',
  'pages.toolPages.scrollDistanceRatio.howToUse[1]',
]
const faqKeys = [
  'pages.toolPages.scrollDistanceRatio.faq[0]',
  'pages.toolPages.scrollDistanceRatio.faq[1]',
  'pages.toolPages.scrollDistanceRatio.faq[2]',
]

useSeo({
  title: t('pages.toolPages.scrollDistanceRatio.seoTitle'),
  description: t('pages.toolPages.scrollDistanceRatio.seoDescription'),
  path: tool.path,
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <header>
        <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolPages.scrollDistanceRatio.h1') }}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          {{ $t('pages.toolPages.scrollDistanceRatio.intro') }}
        </p>
      </header>

      <section class="tool-panel" aria-labelledby="scroll-distance-tool-heading">
        <h2 id="scroll-distance-tool-heading" class="section-title">{{ $t('pages.toolPages.scrollDistanceRatio.toolHeading') }}</h2>
        <ScrollDistanceRatioTool />
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.howToUse') }}</h2>
        <p v-for="paragraphKey in howToUseKeys" :key="paragraphKey">{{ $t(paragraphKey) }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.example') }}</h2>
        <p>
          {{ $t('pages.toolPages.scrollDistanceRatio.example') }}
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
        <p>{{ $t('pages.toolPages.scrollDistanceRatio.privacy') }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.relatedTools') }}</h2>
        <RelatedTools :current-tool="tool" />
      </section>
    </div>
  </article>
</template>
