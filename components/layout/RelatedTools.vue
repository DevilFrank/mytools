<script setup lang="ts">
import { computed } from 'vue'
import { getRelatedTools, type ToolMeta } from '~/data/tools'

const props = defineProps<{
  currentTool: ToolMeta
}>()

const relatedTools = computed(() => getRelatedTools(props.currentTool))
const localePath = useLocalePath()
</script>

<template>
  <ul class="mt-4 grid gap-3 sm:grid-cols-3">
    <li v-for="tool in relatedTools" :key="tool.id">
      <NuxtLink :to="localePath(tool.path)" class="block rounded-md border border-slate-200 bg-white p-4 text-slate-800 no-underline hover:border-blue-200">
        <span class="font-semibold text-slate-950">{{ $t(tool.titleKey) }}</span>
        <span class="mt-1 block text-sm leading-6 text-slate-600">{{ $t(tool.descriptionKey) }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
