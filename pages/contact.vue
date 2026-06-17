<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { useSeo } from '~/composables/useSeo'

const config = useRuntimeConfig()
const { t } = useI18n()
const sectionKeys = [
  'pages.contact.sections[0]',
  'pages.contact.sections[1]',
  'pages.contact.sections[2]',
]

useSeo({
  title: t('pages.contact.seoTitle'),
  description: t('pages.contact.seoDescription'),
  path: '/contact',
})
</script>

<template>
  <article class="page-container">
    <div class="content-shell">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.contact.h1') }}</h1>
      <div class="prose-section">
        <p>
          {{ $t('pages.contact.intro') }}
        </p>
        <p>
          {{ $t('pages.contact.emailLabel') }}: <a :href="`mailto:${config.public.contactEmail}`">{{ config.public.contactEmail }}</a>
        </p>
        <template v-for="sectionKey in sectionKeys" :key="sectionKey">
          <h2 class="section-title">{{ $t(`${sectionKey}.title`) }}</h2>
          <p>{{ $t(`${sectionKey}.body`) }}</p>
        </template>
      </div>
    </div>
  </article>
</template>
