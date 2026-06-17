<script setup lang="ts">
import type { ToolMeta } from '~/data/tools'

defineProps<{
  tool: ToolMeta
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(tool.path)"
    class="block rounded-lg border border-slate-200 bg-white p-5 text-slate-800 no-underline shadow-sm transition hover:border-blue-200 hover:shadow-md"
  >
    <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">{{ $t(tool.categoryKey) }}</p>
    <h3 class="mt-2 text-lg font-semibold tracking-normal text-slate-950">{{ $t(tool.titleKey) }}</h3>
    <p class="mt-2 text-sm leading-6 text-slate-600">{{ $t(tool.descriptionKey) }}</p>
  </NuxtLink>
</template>
