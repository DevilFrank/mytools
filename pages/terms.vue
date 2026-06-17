<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

const { t } = useI18n()
const sectionKeys = [
  'pages.terms.sections[0]',
  'pages.terms.sections[1]',
  'pages.terms.sections[2]',
  'pages.terms.sections[3]',
]

useSeo({
  title: t('pages.terms.seoTitle'),
  description: t('pages.terms.seoDescription'),
  path: '/terms',
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.terms.h1') }}</h1>
      <div class="prose-section">
        <p>
          {{ $t('pages.terms.intro') }}
        </p>
        <template v-for="sectionKey in sectionKeys" :key="sectionKey">
          <h2 class="section-title">{{ $t(`${sectionKey}.title`) }}</h2>
          <p>{{ $t(`${sectionKey}.body`) }}</p>
        </template>
      </div>
    </div>
  </article>
</template>
