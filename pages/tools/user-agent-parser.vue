<script setup lang="ts">
import RelatedTools from '~/components/layout/RelatedTools.vue'
import UserAgentParser from '~/components/tools/UserAgentParser.vue'
import { useSeo } from '~/composables/useSeo'
import { getToolById } from '~/data/tools'

const tool = getToolById('user-agent-parser')!
const { t } = useI18n()
const howToUseKeys = [
  'pages.toolPages.userAgentParser.howToUse[0]',
  'pages.toolPages.userAgentParser.howToUse[1]',
]
const faqKeys = [
  'pages.toolPages.userAgentParser.faq[0]',
  'pages.toolPages.userAgentParser.faq[1]',
  'pages.toolPages.userAgentParser.faq[2]',
]

useSeo({
  title: t('pages.toolPages.userAgentParser.seoTitle'),
  description: t('pages.toolPages.userAgentParser.seoDescription'),
  path: tool.path,
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <header>
        <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolPages.userAgentParser.h1') }}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          {{ $t('pages.toolPages.userAgentParser.intro') }}
        </p>
      </header>

      <section class="tool-panel" aria-labelledby="ua-tool-heading">
        <h2 id="ua-tool-heading" class="section-title">{{ $t('pages.toolPages.userAgentParser.toolHeading') }}</h2>
        <UserAgentParser />
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.howToUse') }}</h2>
        <p v-for="paragraphKey in howToUseKeys" :key="paragraphKey">{{ $t(paragraphKey) }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.example') }}</h2>
        <p>
          {{ $t('pages.toolPages.userAgentParser.example') }}
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
        <p>{{ $t('pages.toolPages.userAgentParser.privacy') }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">{{ $t('common.relatedTools') }}</h2>
        <RelatedTools :current-tool="tool" />
      </section>
    </div>
  </article>
</template>
