export type QueryIntent =
  | 'group_count'
  | 'raw_filter'
  | 'missing_event'
  | 'missing_event_with_fields'
  | 'event_count_compare'
  | 'data_json_group_count'

export type FieldType = 'string' | 'number' | 'json'

export type FilterOperator = '=' | 'like' | '>' | '>=' | '<' | '<='

export interface FilterCondition {
  field: string
  operator: FilterOperator
  value: string | number
}

export interface EventKey {
  type: number
  trackType: number
}

export interface FieldFromEvent {
  event: EventKey
  field: string
  alias?: string
  aggregate?: 'arbitrary' | 'array_agg'
}

export interface EventCountComparison {
  left: EventKey
  right: EventKey
  operator: 'less_than' | 'greater_than'
  leftAlias?: string
  rightAlias?: string
  diffAlias?: string
}

export interface MetricDefinition {
  type: 'count'
  alias: string
}

export interface OrderByDefinition {
  field: string
  direction: 'asc' | 'desc'
}

export interface ParsedQuery {
  intent: QueryIntent
  filters: FilterCondition[]
  groupBy?: string[]
  metrics?: MetricDefinition[]
  orderBy?: OrderByDefinition[]
  mustHave?: EventKey[]
  mustNotHave?: EventKey[]
  returnFields?: FieldFromEvent[]
  eventComparison?: EventCountComparison
  dataJsonField?: string
  limit?: number | null
}

export interface GenerateOptions {
  defaultLimit?: number
  suMatchMode?: 'like' | '='
}

export interface LlmMessageTrace {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LlmTrace {
  provider: 'deepseek'
  model: string
  baseUrl: string
  messages: LlmMessageTrace[]
  responseContent: string
  reasoningContent?: string
  finishReason?: string
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
}

export interface ParseResult {
  parsed: ParsedQuery
  llmTrace?: LlmTrace
}

export interface GenerateSuccess {
  success: true
  data: {
    sql: string
    intent: QueryIntent
    parsed: ParsedQuery
    explanation: string
    warnings: string[]
    fieldDescriptions: string[]
    eventDescriptions: string[]
    llmTrace?: LlmTrace
  }
}

export interface GenerateFailureCandidate {
  eventKey: string
  name: string
  type?: number
  trackType?: number
  category?: string
}

export interface GenerateFailure {
  success: false
  code?: 'AMBIGUOUS_EVENT'
  message: string
  warnings?: string[]
  candidates?: GenerateFailureCandidate[]
  ambiguousText?: string
}

export type GenerateResult = GenerateSuccess | GenerateFailure
