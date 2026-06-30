import type { GenerateOptions } from '../../utils/sql-generator/types'
import { generateSql } from '../../utils/sql-generator'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    input?: unknown
    options?: GenerateOptions
  }>(event)

  const input = typeof body?.input === 'string' ? body.input.trim() : ''

  if (!input) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: '请输入自然语言查询需求。',
    }
  }

  const result = await generateSql(input, body?.options ?? {})
  setResponseStatus(event, result.success ? 200 : 422)
  return result
})
