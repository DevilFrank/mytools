<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { useSeo } from '~/composables/useSeo'

const config = useRuntimeConfig()
const { t } = useI18n()
const sectionKeys = [
  'pages.privacy.sections[0]',
  'pages.privacy.sections[1]',
  'pages.privacy.sections[2]',
  'pages.privacy.sections[3]',
  'pages.privacy.sections[4]',
]

useSeo({
  title: t('pages.privacy.seoTitle'),
  description: t('pages.privacy.seoDescription'),
  path: '/privacy-policy',
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.privacy.h1') }}</h1>
      <div class="prose-section">
        <p>
          {{ $t('pages.privacy.intro') }}
        </p>
        <template v-for="sectionKey in sectionKeys" :key="sectionKey">
          <h2 class="section-title">{{ $t(`${sectionKey}.title`) }}</h2>
          <p>{{ $t(`${sectionKey}.body`) }}</p>
        </template>
        <h2 class="section-title">{{ $t('pages.privacy.contactTitle') }}</h2>
        <p>
          {{ $t('pages.privacy.contactBody') }} <a :href="`mailto:${config.public.contactEmail}`">{{ config.public.contactEmail }}</a>.
        </p>
      </div>
    </div>
  </article>
</template>
