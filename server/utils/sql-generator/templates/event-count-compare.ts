import { eventCondition, renderWhere } from '../sql-utils'
import type { EventKey, ParsedQuery } from '../types'

export function renderEventCountCompare(parsed: ParsedQuery): string {
  const comparison = parsed.eventComparison

  if (!comparison) {
    throw new Error('event_count_compare requires eventComparison')
  }

  const leftCount = renderEventCount(comparison.left)
  const rightCount = renderEventCount(comparison.right)
  const diffExpression = comparison.operator === 'less_than'
    ? `${rightCount}\n      - ${leftCount}`
    : `${leftCount}\n      - ${rightCount}`

  return [
    '*',
    '| SELECT',
    `    ${leftCount} AS ${comparison.leftAlias ?? eventCountAlias(comparison.left)},`,
    `    ${rightCount} AS ${comparison.rightAlias ?? eventCountAlias(comparison.right)},`,
    `    ${diffExpression} AS ${comparison.diffAlias ?? 'diff_count'}`,
    'FROM log',
    renderWhere(parsed.filters)
  ].filter(Boolean).join('\n')
}

function renderEventCount(event: EventKey): string {
  return `SUM(CASE WHEN ${eventCondition(event.type, event.trackType)} THEN 1 ELSE 0 END)`
}

function eventCountAlias(event: EventKey): string {
  return `event_${event.type}_${event.trackType}_count`
}
