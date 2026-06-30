import { fieldDictionary } from '../../utils/sql-generator/field-config'

export default defineEventHandler(() => ({
  success: true,
  data: fieldDictionary,
}))
