import { parseWithDeepSeek } from './deepseek.service'
import type { GenerateOptions, ParseResult } from './types'

export async function parseNaturalLanguage(input: string, options: GenerateOptions = {}): Promise<ParseResult> {
  return parseWithDeepSeek(input, options)
}
