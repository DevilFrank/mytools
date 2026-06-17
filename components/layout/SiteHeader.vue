<template>
  <header class="border-b border-slate-200 bg-white">
    <nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8" :aria-label="$t('nav.primary')">
      <NuxtLink :to="localePath('/')" class="text-lg font-semibold text-slate-950 no-underline">
        {{ $t('site.name') }}
      </NuxtLink>
      <div class="flex flex-wrap items-center gap-3 text-sm font-medium sm:gap-4">
        <NuxtLink :to="localePath('/tools')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.tools') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.contact') }}</NuxtLink>
        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'

const localePath = useLocalePath()
</script>
