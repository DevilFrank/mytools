<script setup lang="ts">
import RelatedTools from '~/components/layout/RelatedTools.vue'
import UrlEncoder from '~/components/tools/UrlEncoder.vue'
import { useSeo } from '~/composables/useSeo'
import { getToolById } from '~/data/tools'

const tool = getToolById('url-encoder')!
const { t } = useI18n()
const howToUseKeys = [
  'pages.toolPages.urlEncoder.howToUse[0]',
  'pages.toolPages.urlEncoder.howToUse[1]',
]
const faqKeys = [
  'pages.toolPages.urlEncoder.faq[0]',
  'pages.toolPages.urlEncoder.faq[1]',
  'pages.toolPages.urlEncoder.faq[2]',
]

useSeo({
  title: t('pages.toolPages.urlEncoder.seoTitle'),
  description: t('pages.toolPages.urlEncoder.seoDescription'),
  path: tool.path,
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <header>
        <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolPages.urlEncoder.h1') }}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          {{ $t('pages.toolPages.urlEncoder.intro') }}
        </p>
      </header>

      <section class="tool-panel" aria-labelledby="url-tool-heading">
        <h2 id="url-tool-heading" class="section-title">{{ $t('pages.toolPages.urlEncoder.toolHeading') }}</h2>
        <UrlEncoder />
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.howToUse') }}</h2>
        <p v-for="paragraphKey in howToUseKeys" :key="paragraphKey">{{ $t(paragraphKey) }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.example') }}</h2>
        <p>
          {{ $t('pages.toolPages.urlEncoder.example') }}
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
        <p>{{ $t('pages.toolPages.urlEncoder.privacy') }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.relatedTools') }}</h2>
        <RelatedTools :current-tool="tool" />
      </section>
    </div>
  </article>
</template>
