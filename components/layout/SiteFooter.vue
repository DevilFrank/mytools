<template>
  <footer class="mt-auto border-t border-slate-200 bg-white">
    <div class="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 sm:grid-cols-2 sm:px-6 lg:px-8">
      <div>
        <p class="font-semibold text-slate-950">{{ $t('site.name') }}</p>
        <p class="mt-2 max-w-xl">
          {{ $t('footer.description') }}
        </p>
      </div>
      <nav class="flex flex-wrap items-start gap-4 sm:justify-end" :aria-label="$t('nav.footer')">
        <NuxtLink :to="localePath('/tools')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.tools') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/privacy-policy')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.privacy') }}</NuxtLink>
        <NuxtLink :to="localePath('/terms')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.terms') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="text-slate-700 no-underline hover:text-blue-800">{{ $t('nav.contact') }}</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
