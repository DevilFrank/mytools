<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { useSeo } from '~/composables/useSeo'

const config = useRuntimeConfig()
const { t } = useI18n()
const sectionKeys = [
  'pages.about.sections[0]',
  'pages.about.sections[1]',
  'pages.about.sections[2]',
  'pages.about.sections[3]',
]

useSeo({
  title: t('pages.about.seoTitle'),
  description: t('pages.about.seoDescription'),
  path: '/about',
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.about.h1') }}</h1>
      <div class="prose-section">
        <p>
          {{ $t('pages.about.intro') }}
        </p>
        <template v-for="sectionKey in sectionKeys" :key="sectionKey">
          <h2 class="section-title">{{ $t(`${sectionKey}.title`) }}</h2>
          <p>{{ $t(`${sectionKey}.body`) }}</p>
        </template>
        <h2 class="section-title">{{ $t('pages.about.contactTitle') }}</h2>
        <p>
          {{ $t('pages.about.contactBody') }} <a :href="`mailto:${config.public.contactEmail}`">{{ config.public.contactEmail }}</a>.
        </p>
      </div>
    </div>
  </article>
</template>
