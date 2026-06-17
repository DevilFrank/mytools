<script setup lang="ts">
import RelatedTools from '~/components/layout/RelatedTools.vue'
import JsonFormatter from '~/components/tools/JsonFormatter.vue'
import { useSeo } from '~/composables/useSeo'
import { getToolById } from '~/data/tools'

const tool = getToolById('json-formatter')!
const { t } = useI18n()
const howToUseKeys = [
  'pages.toolPages.jsonFormatter.howToUse[0]',
  'pages.toolPages.jsonFormatter.howToUse[1]',
]
const faqKeys = [
  'pages.toolPages.jsonFormatter.faq[0]',
  'pages.toolPages.jsonFormatter.faq[1]',
  'pages.toolPages.jsonFormatter.faq[2]',
  'pages.toolPages.jsonFormatter.faq[3]',
]

useSeo({
  title: t('pages.toolPages.jsonFormatter.seoTitle'),
  description: t('pages.toolPages.jsonFormatter.seoDescription'),
  path: tool.path,
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <header>
        <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolPages.jsonFormatter.h1') }}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          {{ $t('pages.toolPages.jsonFormatter.intro') }}
        </p>
      </header>

      <section class="tool-panel" aria-labelledby="json-tool-heading">
        <h2 id="json-tool-heading" class="section-title">{{ $t('pages.toolPages.jsonFormatter.toolHeading') }}</h2>
        <JsonFormatter />
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.howToUse') }}</h2>
        <p v-for="paragraphKey in howToUseKeys" :key="paragraphKey">{{ $t(paragraphKey) }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.example') }}</h2>
        <p>
          {{ $t('pages.toolPages.jsonFormatter.example') }}
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
        <p>{{ $t('pages.toolPages.jsonFormatter.privacy') }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.relatedTools') }}</h2>
        <RelatedTools :current-tool="tool" />
      </section>
    </div>
  </article>
</template>
