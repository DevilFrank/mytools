<script setup lang="ts">
import ToolCard from '~/components/layout/ToolCard.vue'
import { useSeo } from '~/composables/useSeo'
import { tools } from '~/data/tools'

const featuredTools = tools
const { t } = useI18n()
const localePath = useLocalePath()
const categoryKeys = ['categories.developer', 'categories.encoding', 'categories.dateTime', 'categories.diagnostics', 'categories.logAnalysis']

useSeo({
  title: t('pages.home.seoTitle'),
  description: t('pages.home.seoDescription'),
  path: '/',
})
</script>

<template>
  <div>
    <section class="bg-white">
      <div class="page-container grid gap-8 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">{{ $t('pages.home.eyebrow') }}</p>
          <h1 class="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            {{ $t('pages.home.h1') }}
          </h1>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            {{ $t('pages.home.intro') }}
          </p>
          <p class="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {{ $t('pages.home.privacy') }}
          </p>
          <div class="button-row">
            <NuxtLink :to="localePath('/tools')" class="btn-primary">{{ $t('common.browseTools') }}</NuxtLink>
            <NuxtLink :to="localePath('/privacy-policy')" class="btn-secondary">{{ $t('common.privacyPolicy') }}</NuxtLink>
          </div>
        </div>
        <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h2 class="text-xl font-semibold tracking-normal text-slate-950">{{ $t('pages.home.categoriesTitle') }}</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-700">
            <li v-for="categoryKey in categoryKeys" :key="categoryKey">{{ $t(categoryKey) }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="page-container">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="section-title">{{ $t('pages.home.recommendedTitle') }}</h2>
          <p class="mt-2 max-w-2xl text-slate-600">
            {{ $t('pages.home.recommendedIntro') }}
          </p>
        </div>
        <NuxtLink :to="localePath('/tools')" class="text-sm font-semibold text-blue-700 no-underline">{{ $t('common.viewAllTools') }}</NuxtLink>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard v-for="tool in featuredTools" :key="tool.id" :tool="tool" />
      </div>
    </section>

    <section class="page-container pt-0">
      <div class="content-shell">
        <h2 class="section-title">{{ $t('pages.home.staticTitle') }}</h2>
        <p class="mt-4 leading-7 text-slate-700">
          {{ $t('pages.home.staticIntro') }}
        </p>
      </div>
    </section>
  </div>
</template>
