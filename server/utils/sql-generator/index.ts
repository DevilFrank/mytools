import { parseNaturalLanguage } from './parser.service'
import { AmbiguousEventError } from './parser.service'
import { buildEventDescriptions, buildExplanation, buildFieldDescriptions, renderSql } from './renderer.service'
import { validateParsedQuery } from './validator.service'
import type { GenerateOptions, GenerateResult } from './types'

export async function generateSql(input: string, options: GenerateOptions = {}): Promise<GenerateResult> {
  try {
    const parseResult = await parseNaturalLanguage(input, options)
    const parsed = parseResult.parsed
    const validation = validateParsedQuery(parsed)

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message ?? '暂不支持该查询需求，请补充 su、分组字段或过滤条件。',
        warnings: validation.warnings
      }
    }

    return {
      success: true,
      data: {
        sql: renderSql(parsed),
        intent: parsed.intent,
        parsed,
        explanation: buildExplanation(parsed),
        warnings: validation.warnings,
        fieldDescriptions: buildFieldDescriptions(parsed),
        eventDescriptions: buildEventDescriptions(parsed),
        llmTrace: parseResult.llmTrace
      }
    }
  } catch (error) {
    if (error instanceof AmbiguousEventError) {
      return {
        success: false,
        code: error.code,
        message: error.message,
        candidates: error.candidates,
        ambiguousText: error.ambiguousText,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'SQL 生成失败。'
    }
  }
}
