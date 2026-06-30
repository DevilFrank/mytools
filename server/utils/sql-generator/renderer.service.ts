import { fieldDescriptionMap } from './field-config'
import { renderDataJsonGroupCount } from './templates/data-json-group-count'
import { renderEventCountCompare } from './templates/event-count-compare'
import { renderGroupCount } from './templates/group-count'
import { renderMissingEventWithFields } from './templates/missing-event-with-fields'
import { renderMissingEvent } from './templates/missing-event'
import { renderRawFilter } from './templates/raw-filter'
import { eventDictionary, type EventDefinition } from '../../src/modules/sql-generator/event-dictionary'
import type { ParsedQuery } from './types'

export function renderSql(parsed: ParsedQuery): string {
  switch (parsed.intent) {
    case 'group_count':
      return renderGroupCount(parsed)
    case 'raw_filter':
      return renderRawFilter(parsed)
    case 'missing_event':
      return renderMissingEvent(parsed)
    case 'missing_event_with_fields':
      return renderMissingEventWithFields(parsed)
    case 'event_count_compare':
      return renderEventCountCompare(parsed)
    case 'data_json_group_count':
      return renderDataJsonGroupCount(parsed)
    default:
      throw new Error('Unsupported query intent')
  }
}

export function buildExplanation(parsed: ParsedQuery): string {
  const hasSu = parsed.filters.some((filter) => filter.field === 'su')

  if (parsed.intent === 'group_count') {
    if (parsed.groupBy?.includes('type') && parsed.groupBy.includes('trackType')) {
      return `${hasSu ? '该 SQL 查询 su 包含指定 URL 的日志，并' : '该 SQL '}按照 type、trackType 的组合分组统计数量。`
    }

    return `${hasSu ? '该 SQL 查询 su 包含指定 URL 的日志，并' : '该 SQL '}按照 ${parsed.groupBy?.join('、')} 分组统计数量。`
  }

  if (parsed.intent === 'raw_filter') {
    return '该 SQL 按指定条件过滤日志明细，并默认返回最多 1000 条。'
  }

  if (parsed.intent === 'missing_event') {
    return '该 SQL 按 trackId 聚合，筛选同一链路下存在指定事件且不存在另一个事件的日志。'
  }

  if (parsed.intent === 'missing_event_with_fields') {
    return '该 SQL 按 trackId 聚合，筛选有 A 无 B 的链路，并从指定事件中提取字段。'
  }

  if (parsed.intent === 'event_count_compare') {
    return '该 SQL 在指定过滤条件内分别统计两个事件的数量，并计算两者差值。'
  }

  return `该 SQL 提取 data 中的 ${parsed.dataJsonField} 字段，并按该 JSON 字段统计数量。`
}

export function buildFieldDescriptions(parsed: ParsedQuery): string[] {
  const fields = new Set<string>()

  parsed.filters.forEach((filter) => fields.add(filter.field))
  parsed.groupBy?.forEach((field) => {
    if (fieldDescriptionMap[field]) fields.add(field)
  })
  parsed.returnFields?.forEach((field) => fields.add(field.field))

  if (parsed.mustHave?.length || parsed.mustNotHave?.length) {
    fields.add('trackId')
    fields.add('type')
    fields.add('trackType')
  }

  if (parsed.eventComparison) {
    fields.add('type')
    fields.add('trackType')
  }

  if (parsed.dataJsonField) {
    fields.add('data')
  }

  const descriptions = [...fields].map((field) => {
    const item = fieldDescriptionMap[field]
    if (!item) {
      return ''
    }

    if (field === 'su') {
      return `${field}：${item.description}，默认使用 LIKE 匹配。`
    }

    if (item.description.includes('SLS 查询中按')) {
      return `${field}：${item.description}。`
    }

    return `${field}：${item.description}，SLS 查询中按 ${item.type} 处理。`
  }).filter(Boolean)

  if (parsed.metrics?.some((metric) => metric.alias === 'cnt')) {
    descriptions.push('cnt：当前分组下的日志数量。')
  }

  if (parsed.intent === 'missing_event') {
    descriptions.push('total_count：当前 trackId 下的日志总数。')
  }

  if (parsed.intent === 'event_count_compare') {
    descriptions.push('diff_count：两个事件计数的差值；“A 比 B 少多少”时表示 B_count - A_count。')
  }

  if (parsed.groupBy?.includes('type') && parsed.groupBy.includes('trackType')) {
    descriptions.push('cc：type 和 trackType 的组合，例如 (6, 1)、(7, 1)。')
  }

  return descriptions
}

export function buildEventDescriptions(parsed: ParsedQuery): string[] {
  const descriptions: string[] = []

  if (parsed.groupBy?.includes('type') && parsed.groupBy.includes('trackType')) {
    descriptions.push('按事件分组等价于按 type 和 trackType 分组。')
    descriptions.push('cc 表示事件组合，例如 (6,1) = 点击广告，(7,1) = 点击广告成功，(4,1) = 落地页加载成功。')
  }

  if (parsed.intent === 'missing_event' || parsed.intent === 'missing_event_with_fields') {
    parsed.mustHave?.forEach((eventKey) => {
      const event = findEventDefinition(eventKey.type, eventKey.trackType)
      descriptions.push(`必须存在事件：${event ? eventLabel(event) : `${eventKey.type}-${eventKey.trackType}`}。`)
    })

    parsed.mustNotHave?.forEach((eventKey) => {
      const event = findEventDefinition(eventKey.type, eventKey.trackType)
      descriptions.push(`必须缺失事件：${event ? eventLabel(event) : `${eventKey.type}-${eventKey.trackType}`}。`)
    })
  }

  if (parsed.intent === 'event_count_compare' && parsed.eventComparison) {
    const leftEvent = findEventDefinition(parsed.eventComparison.left.type, parsed.eventComparison.left.trackType)
    const rightEvent = findEventDefinition(parsed.eventComparison.right.type, parsed.eventComparison.right.trackType)

    if (leftEvent) {
      descriptions.push(`对比事件 A：${eventLabel(leftEvent)}。`)
    }

    if (rightEvent) {
      descriptions.push(`对比事件 B：${eventLabel(rightEvent)}。`)
    }

    if (leftEvent && rightEvent) {
      const operatorText = parsed.eventComparison.operator === 'less_than'
        ? `${rightEvent.name}数量 - ${leftEvent.name}数量`
        : `${leftEvent.name}数量 - ${rightEvent.name}数量`
      descriptions.push(`diff_count 表示：${operatorText}。`)
    }
  }

  getFilterEvents(parsed).forEach((event) => {
    descriptions.push(`${formatEventCondition(event)}：${formatEventMeaning(event)}。`)
  })

  return [...new Set(descriptions)]
}

function getFilterEvents(parsed: ParsedQuery): EventDefinition[] {
  const events: EventDefinition[] = []
  const typeFilters = parsed.filters.filter((filter) => filter.field === 'type' && filter.operator === '=' && typeof filter.value === 'number')
  const trackTypeFilters = parsed.filters.filter((filter) => filter.field === 'trackType' && filter.operator === '=' && typeof filter.value === 'number')

  typeFilters.forEach((typeFilter) => {
    trackTypeFilters.forEach((trackTypeFilter) => {
      const event = findEventDefinition(typeFilter.value as number, trackTypeFilter.value as number)
      if (event) {
        events.push(event)
      }
    })
  })

  return events
}

function findEventDefinition(type: number, trackType?: number): EventDefinition | undefined {
  return eventDictionary.find((event) => event.type === type && event.trackType === trackType)
}

function formatEventCondition(event: EventDefinition): string {
  if (typeof event.trackType === 'number') {
    return `type=${event.type}, trackType=${event.trackType}`
  }

  return `type=${event.type}`
}

function formatEventMeaning(event: EventDefinition): string {
  const parts = [event.name]

  if (event.action) {
    parts.push(`action=${event.action}`)
  }

  if (event.actionValueMeaning) {
    parts.push(`actionValue 表示${event.actionValueMeaning}`)
  }

  return parts.join('，')
}

function eventLabel(event: EventDefinition): string {
  return `${event.eventKey} ${event.name}`
}
