import { eventDictionary } from '../../src/modules/sql-generator/event-dictionary'

export default defineEventHandler(() => ({
  success: true,
  data: eventDictionary,
}))
