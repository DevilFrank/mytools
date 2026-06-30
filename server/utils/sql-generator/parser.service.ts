import { parseWithDeepSeek } from './deepseek.service'
import {
  findEventMatch,
  toEventCandidate,
  type EventDefinition
} from '../../src/modules/sql-generator/event-dictionary'
import { knownFields } from './field-config'
import type { EventKey, FieldFromEvent, FilterCondition, GenerateOptions, ParseResult, ParsedQuery } from './types'

export class AmbiguousEventError extends Error {
  code = 'AMBIGUOUS_EVENT' as const
  candidates: ReturnType<typeof toEventCandidate>[]
  ambiguousText?: string

  constructor(candidates: EventDefinition[], ambiguousText?: string) {
    super('事件名称存在多个匹配项，请选择具体事件。')
    this.candidates = candidates.map(toEventCandidate)
    this.ambiguousText = ambiguousText
  }
}

export async function parseNaturalLanguage(input: string, options: GenerateOptions = {}): Promise<ParseResult> {
  const parsedByRules = parseWithEventDictionary(input, options)
  if (parsedByRules) {
    return { parsed: parsedByRules }
  }

  return parseWithDeepSeek(input, options)
}

function parseWithEventDictionary(input: string, options: GenerateOptions): ParsedQuery | null {
  const filters = extractFilters(input, options)

  const eventCompareQuery = parseEventCountCompareQuery(input, filters)
  if (eventCompareQuery) {
    return eventCompareQuery
  }

  if (isEventGroupQuery(input)) {
    return {
      intent: 'group_count',
      filters,
      groupBy: ['type', 'trackType'],
      metrics: [{ type: 'count', alias: 'cnt' }],
      orderBy: [{ field: 'cnt', direction: 'desc' }],
      limit: null,
    }
  }

  const missingEventQuery = parseMissingEventQuery(input, filters)
  if (missingEventQuery) {
    return missingEventQuery
  }

  const event = resolveEvent(input)
  if (!event) {
    return null
  }

  const eventFilters: FilterCondition[] = [
    ...filters,
    { field: 'type', operator: '=', value: event.type },
  ]

  if (typeof event.trackType === 'number') {
    eventFilters.push({ field: 'trackType', operator: '=', value: event.trackType })
  }

  return {
    intent: 'raw_filter',
    filters: eventFilters,
    metrics: [{ type: 'count', alias: 'cnt' }],
    orderBy: [{ field: 'cnt', direction: 'desc' }],
    limit: options.defaultLimit ?? 1000,
  }
}

function parseEventCountCompareQuery(input: string, filters: FilterCondition[]): ParsedQuery | null {
  const segment = input
    .split(/[，,。；;]/)
    .find((part) => part.includes('比') && /(?:少|多)\s*多少/.test(part))
    ?? input

  const match = segment.match(/(.+?)比(.+?)(少|多)\s*多少(?:个|条|次)?/)
  if (!match) {
    return null
  }

  const leftEvent = resolveEvent(cleanEventSegment(match[1]))
  const rightEvent = resolveEvent(cleanEventSegment(match[2]))

  if (!leftEvent || !rightEvent || typeof leftEvent.trackType !== 'number' || typeof rightEvent.trackType !== 'number') {
    return null
  }

  const left = { type: leftEvent.type, trackType: leftEvent.trackType }
  const right = { type: rightEvent.type, trackType: rightEvent.trackType }

  return {
    intent: 'event_count_compare',
    filters,
    eventComparison: {
      left,
      right,
      operator: match[3] === '少' ? 'less_than' : 'greater_than',
      leftAlias: eventCountAlias(left),
      rightAlias: eventCountAlias(right),
      diffAlias: 'diff_count',
    },
    limit: null,
  }
}

function parseMissingEventQuery(input: string, filters: FilterCondition[]): ParsedQuery | null {
  const match = input.match(/有(.+?)(?:但是|但|却|且|并且)?没有(.+?)(?:，|,|。|$)/)
  if (!match) {
    return null
  }

  const mustHaveEvent = resolveEvent(cleanEventSegment(match[1]))
  const mustNotHaveEvent = resolveEvent(cleanEventSegment(match[2]))

  if (!mustHaveEvent || !mustNotHaveEvent || typeof mustHaveEvent.trackType !== 'number' || typeof mustNotHaveEvent.trackType !== 'number') {
    return null
  }

  const mustHave = [{ type: mustHaveEvent.type, trackType: mustHaveEvent.trackType }]
  const mustNotHave = [{ type: mustNotHaveEvent.type, trackType: mustNotHaveEvent.trackType }]
  const returnFields = parseReturnFields(input, mustHaveEvent)

  return {
    intent: returnFields.length > 0 ? 'missing_event_with_fields' : 'missing_event',
    filters,
    mustHave,
    mustNotHave,
    returnFields: returnFields.length > 0 ? returnFields : undefined,
    metrics: [{ type: 'count', alias: 'cnt' }],
    orderBy: [{ field: 'cnt', direction: 'desc' }],
    limit: 100000,
  }
}

function parseReturnFields(input: string, fallbackEvent: EventDefinition): FieldFromEvent[] {
  const returnMatch = input.match(/返回(.+?)的\s*([A-Za-z_][A-Za-z0-9_]*)/i)
  const fields: FieldFromEvent[] = []

  if (returnMatch) {
    const event = resolveEvent(cleanEventSegment(returnMatch[1])) ?? fallbackEvent
    const field = returnMatch[2]

    if (typeof event.trackType === 'number' && knownFields.has(field)) {
      fields.push({
        event: { type: event.type, trackType: event.trackType },
        field,
        alias: field === 'actionValue' ? 'actionValue' : `${field}_${event.type}_${event.trackType}`,
        aggregate: 'arbitrary',
      })
    }
  } else if (/返回.*actionValue/i.test(input) && typeof fallbackEvent.trackType === 'number') {
    fields.push({
      event: { type: fallbackEvent.type, trackType: fallbackEvent.trackType },
      field: 'actionValue',
      alias: 'actionValue',
      aggregate: 'arbitrary',
    })
  }

  return fields
}

function resolveEvent(text: string): EventDefinition | null {
  const result = findEventMatch(text)

  if (result.candidates.length > 1) {
    throw new AmbiguousEventError(result.candidates, result.ambiguousText)
  }

  return result.event
}

function extractFilters(input: string, options: GenerateOptions): FilterCondition[] {
  const filters: FilterCondition[] = []
  const suMatch = input.match(/\bsu\b\s*(?:是|为|=|等于|包含)?\s*(https?:\/\/[^\s，,。；;]+)/i)

  if (suMatch?.[1]) {
    filters.push({
      field: 'su',
      operator: options.suMatchMode ?? 'like',
      value: suMatch[1],
    })
  }

  return filters
}

function isEventGroupQuery(input: string): boolean {
  return /按\s*事件\s*分组/.test(input)
    || /按\s*type\s*(?:和|、|,|，)\s*trackType\s*分组/i.test(input)
}

function cleanEventSegment(text: string): string {
  return text
    .replace(/^查询/, '')
    .replace(/\bsu\b\s*(?:是|为|=|等于|包含)?\s*https?:\/\/[^\s，,。；;]+/i, '')
    .replace(/的数据.*$/, '')
    .replace(/的日志.*$/, '')
    .replace(/的明细.*$/, '')
    .replace(/事件$/, '')
    .trim()
}

function eventCountAlias(event: EventKey): string {
  return `event_${event.type}_${event.trackType}_count`
}
