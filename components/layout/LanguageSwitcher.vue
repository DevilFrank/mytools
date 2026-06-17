<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const locales = [
  { code: 'en', labelKey: 'language.english' },
  { code: 'zh-CN', labelKey: 'language.chinese' },
]
</script>

<template>
  <div class="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 p-1 text-xs font-semibold" :aria-label="$t('language.label')">
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="rounded px-2 py-1 no-underline transition"
      :class="locale === item.code ? 'bg-white text-blue-800 shadow-sm' : 'text-slate-600 hover:text-blue-800'"
      :aria-current="locale === item.code ? 'true' : undefined"
    >
      {{ $t(item.labelKey) }}
    </NuxtLink>
  </div>
</template>
