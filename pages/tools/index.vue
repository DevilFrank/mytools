<script setup lang="ts">
import { computed } from 'vue'
import ToolCard from '~/components/layout/ToolCard.vue'
import { useSeo } from '~/composables/useSeo'
import { tools, type ToolMeta } from '~/data/tools'

const { t } = useI18n()

useSeo({
  title: t('pages.toolsIndex.seoTitle'),
  description: t('pages.toolsIndex.seoDescription'),
  path: '/tools',
})

const groupedTools = computed(() => {
  return tools.reduce<Record<string, ToolMeta[]>>((groups, tool) => {
    groups[tool.categoryKey] ||= []
    groups[tool.categoryKey].push(tool)
    return groups
  }, {})
})
</script>

<template>
  <div class="page-container">
    <header class="content-shell">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">{{ $t('pages.toolsIndex.h1') }}</h1>
      <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
        {{ $t('pages.toolsIndex.intro') }}
      </p>
    </header>

    <section v-for="(items, category) in groupedTools" :key="category" class="prose-section">
      <h2 class="section-title">{{ $t(category) }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard v-for="tool in items" :key="tool.id" :tool="tool" />
      </div>
    </section>
  </div>
</template>
