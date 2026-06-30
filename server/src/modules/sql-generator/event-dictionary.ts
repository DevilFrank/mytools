export interface EventDefinition {
  eventKey: string
  type: number
  trackType?: number
  name: string
  category: string
  description: string
  action?: string
  actionValueMeaning?: string
  aliases?: string[]
}

export interface EventCandidate {
  eventKey: string
  name: string
  type: number
  trackType?: number
  category: string
}

export interface EventMatchResult {
  event: EventDefinition | null
  candidates: EventDefinition[]
  ambiguousText?: string
}

export const eventDictionary: EventDefinition[] = [
  {
    eventKey: '3-1',
    type: 3,
    trackType: 1,
    name: '开始任务',
    category: '取任务',
    description: '开始任务',
    aliases: ['任务开始', '开始执行任务']
  },
  {
    eventKey: '3-2',
    type: 3,
    trackType: 2,
    name: '完成任务',
    category: '取任务',
    description: '完成任务',
    action: 'description',
    actionValueMeaning: 'pageDepth、keyBehaviorsNum、closs',
    aliases: ['任务完成', '结束任务', '完成执行任务']
  },
  {
    eventKey: '3-3',
    type: 3,
    trackType: 3,
    name: '页面报错',
    category: '取任务',
    description: '页面报错，code 为错误码，actionValue 为错误描述信息',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['页面错误', '页面异常']
  },
  {
    eventKey: '3-4',
    type: 3,
    trackType: 4,
    name: '代码报错',
    category: '取任务',
    description: '代码报错，code 为错误码，actionValue 为错误描述信息',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['代码错误', '代码异常', 'JS代码报错']
  },
  {
    eventKey: '3-5',
    type: 3,
    trackType: 5,
    name: '落地页报错',
    category: '取任务',
    description: '落地页报错，actionValue 为错误描述信息',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['落地页错误', '落地页异常']
  },
  {
    eventKey: '3-6',
    type: 3,
    trackType: 6,
    name: '报警域名报错',
    category: '取任务',
    description: '报警域名报错，actionValue 为报警域名',
    action: 'description',
    actionValueMeaning: '报警域名',
    aliases: ['报警域名错误', '域名报警']
  },
  {
    eventKey: '3-7',
    type: 3,
    trackType: 7,
    name: '前台任务应用不在前台',
    category: '取任务',
    description: '前台任务应用不在前台',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['应用不在前台', 'app不在前台']
  },
  {
    eventKey: '3-8',
    type: 3,
    trackType: 8,
    name: '注册google插件失败',
    category: '取任务',
    description: '注册 google 插件失败',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['注册谷歌插件失败', 'google插件失败', '谷歌插件注册失败']
  },
  {
    eventKey: '3-9',
    type: 3,
    trackType: 9,
    name: '前台任务activity销毁',
    category: '取任务',
    description: '前台任务 activity 销毁',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['activity销毁', '任务activity销毁']
  },
  {
    eventKey: '3-10',
    type: 3,
    trackType: 10,
    name: '创建WebView失败',
    category: '取任务',
    description: '创建 WebView 失败',
    action: 'description',
    actionValueMeaning: '错误描述信息',
    aliases: ['WebView创建失败', '创建webview失败']
  },
  {
    eventKey: '4-1',
    type: 4,
    trackType: 1,
    name: '落地页加载成功',
    category: '落地页',
    description: '落地页加载成功',
    aliases: ['落地页成功', '页面加载成功', '落地页打开成功']
  },
  {
    eventKey: '4-2',
    type: 4,
    trackType: 2,
    name: '任务暂停',
    category: '落地页',
    description: '任务暂停',
    aliases: ['暂停任务']
  },
  {
    eventKey: '4-3',
    type: 4,
    trackType: 3,
    name: '任务继续',
    category: '落地页',
    description: '任务继续',
    aliases: ['继续任务', '恢复任务']
  },
  {
    eventKey: '5-1',
    type: 5,
    trackType: 1,
    name: '有页面广告',
    category: '判断广告',
    description: '有页面广告。step=1 是一级页面，其他 step 是二级页面',
    aliases: ['页面广告', '检测到页面广告', '有广告']
  },
  {
    eventKey: '5-2',
    type: 5,
    trackType: 2,
    name: '有二级页面',
    category: '判断广告',
    description: '有二级页面',
    aliases: ['二级页面', '检测到二级页面']
  },
  {
    eventKey: '5-3',
    type: 5,
    trackType: 3,
    name: '有二次搜索',
    category: '判断广告',
    description: '有二次搜索',
    aliases: ['二次搜索', '检测到二次搜索']
  },
  {
    eventKey: '5-4',
    type: 5,
    trackType: 4,
    name: '有广告效应',
    category: '判断广告',
    description: '有广告效应',
    aliases: ['广告效应', '检测到广告效应']
  },
  {
    eventKey: '5-6',
    type: 5,
    trackType: 6,
    name: '有关联搜索',
    category: '判断广告',
    description: '有关联搜索',
    aliases: ['关联搜索', '检测到关联搜索']
  },
  {
    eventKey: '5-7',
    type: 5,
    trackType: 7,
    name: '有插屏广告',
    category: '判断广告',
    description: '有插屏广告',
    aliases: ['插屏广告', '检测到插屏']
  },
  {
    eventKey: '5-9',
    type: 5,
    trackType: 9,
    name: '有横幅广告',
    category: '判断广告',
    description: '有横幅广告',
    aliases: ['横幅广告', 'banner广告', '检测到横幅']
  },
  {
    eventKey: '5-10',
    type: 5,
    trackType: 10,
    name: '有协议',
    category: '判断广告',
    description: '有协议',
    aliases: ['检测到协议', '协议弹窗']
  },
  {
    eventKey: '6-0',
    type: 6,
    trackType: 0,
    name: '等待真实点击',
    category: '关键行为',
    description: '等待真实点击',
    action: 'description',
    actionValueMeaning: 'clickad、interstitial、banner',
    aliases: ['等待点击', '等待用户点击']
  },
  {
    eventKey: '6-1',
    type: 6,
    trackType: 1,
    name: '点击广告',
    category: '关键行为',
    description: '点击广告',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['广告点击', '点击页面广告']
  },
  {
    eventKey: '6-2',
    type: 6,
    trackType: 2,
    name: '点击二级页面',
    category: '关键行为',
    description: '点击二级页面',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['二级页面点击']
  },
  {
    eventKey: '6-3',
    type: 6,
    trackType: 3,
    name: '二次搜索',
    category: '关键行为',
    description: '二次搜索',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['执行二次搜索', '点击二次搜索']
  },
  {
    eventKey: '6-4',
    type: 6,
    trackType: 4,
    name: '广告效应',
    category: '关键行为',
    description: '广告效应',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['点击广告效应']
  },
  {
    eventKey: '6-5',
    type: 6,
    trackType: 5,
    name: '返回',
    category: '关键行为',
    description: '返回',
    aliases: ['执行返回', '点击返回']
  },
  {
    eventKey: '6-6',
    type: 6,
    trackType: 6,
    name: '关联搜索',
    category: '关键行为',
    description: '关联搜索',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['点击关联搜索']
  },
  {
    eventKey: '6-7',
    type: 6,
    trackType: 7,
    name: '点击插屏',
    category: '关键行为',
    description: '点击插屏',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['插屏点击', '点击插屏广告']
  },
  {
    eventKey: '6-8',
    type: 6,
    trackType: 8,
    name: '关闭插屏',
    category: '关键行为',
    description: '关闭插屏',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['插屏关闭', '关闭插屏广告']
  },
  {
    eventKey: '6-9',
    type: 6,
    trackType: 9,
    name: '点击横幅广告',
    category: '关键行为',
    description: '点击横幅广告',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['点击banner', '点击banner广告', '横幅广告点击']
  },
  {
    eventKey: '6-10',
    type: 6,
    trackType: 10,
    name: '同意协议',
    category: '关键行为',
    description: '同意协议',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['点击同意协议', '协议同意']
  },
  {
    eventKey: '6-11',
    type: 6,
    trackType: 11,
    name: '拒绝协议',
    category: '关键行为',
    description: '拒绝协议',
    action: 'coords',
    actionValueMeaning: '点击坐标信息 x,y',
    aliases: ['点击拒绝协议', '协议拒绝']
  },
  {
    eventKey: '7-1',
    type: 7,
    trackType: 1,
    name: '点击广告成功',
    category: '落地页',
    description: '点击广告成功',
    aliases: ['广告点击成功', '点击页面广告成功']
  },
  {
    eventKey: '7-2',
    type: 7,
    trackType: 2,
    name: '点击二级页面成功',
    category: '落地页',
    description: '点击二级页面成功',
    aliases: ['二级页面点击成功']
  },
  {
    eventKey: '7-3',
    type: 7,
    trackType: 3,
    name: '二次搜索成功',
    category: '落地页',
    description: '二次搜索成功',
    aliases: ['执行二次搜索成功']
  },
  {
    eventKey: '7-4',
    type: 7,
    trackType: 4,
    name: '广告效应成功',
    category: '落地页',
    description: '广告效应成功',
    aliases: ['广告效应点击成功']
  },
  {
    eventKey: '7-5',
    type: 7,
    trackType: 5,
    name: '返回成功',
    category: '落地页',
    description: '返回成功',
    aliases: ['执行返回成功']
  },
  {
    eventKey: '7-6',
    type: 7,
    trackType: 6,
    name: '关联搜索成功',
    category: '落地页',
    description: '关联搜索成功',
    aliases: ['点击关联搜索成功']
  },
  {
    eventKey: '7-7',
    type: 7,
    trackType: 7,
    name: '点击插屏成功',
    category: '落地页',
    description: '点击插屏成功',
    aliases: ['插屏点击成功', '点击插屏广告成功']
  },
  {
    eventKey: '7-8',
    type: 7,
    trackType: 8,
    name: '关闭插屏成功',
    category: '落地页',
    description: '关闭插屏成功',
    aliases: ['插屏关闭成功', '关闭插屏广告成功']
  },
  {
    eventKey: '7-9',
    type: 7,
    trackType: 9,
    name: '点击横幅广告成功',
    category: '落地页',
    description: '点击横幅广告成功',
    aliases: ['点击banner成功', '横幅广告点击成功']
  },
  {
    eventKey: '7-10',
    type: 7,
    trackType: 10,
    name: '同意协议成功',
    category: '落地页',
    description: '同意协议成功',
    aliases: ['协议同意成功']
  },
  {
    eventKey: '7-11',
    type: 7,
    trackType: 11,
    name: '拒绝协议成功',
    category: '落地页',
    description: '拒绝协议成功',
    aliases: ['协议拒绝成功']
  },
  {
    eventKey: '8-1',
    type: 8,
    trackType: 1,
    name: 'activity运行时长',
    category: '宿主app相关',
    description: 'activity 运行时长',
    action: 'activity名称',
    actionValueMeaning: '运行时长，单位秒',
    aliases: ['activity时长', '页面运行时长', 'activity运行时间']
  }
]

export function normalizeEventText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\u3000:：,，.。;；!！?？"'“”‘’`~|/\\()[\]{}<>《》【】、_-]+/g, '')
}

export function toEventCandidate(event: EventDefinition): EventCandidate {
  return {
    eventKey: event.eventKey,
    name: event.name,
    type: event.type,
    trackType: event.trackType,
    category: event.category
  }
}

export function findEventByText(text: string): EventDefinition | null {
  const result = findEventMatch(text)
  return result.candidates.length === 1 ? result.event : null
}

export function findEventMatch(text: string): EventMatchResult {
  const query = normalizeEventText(stripQueryWords(text))
  const normalizedText = normalizeEventText(text)

  if (!query && !normalizedText) {
    return { event: null, candidates: [] }
  }

  const keyMatch = text.match(/\b\d+\s*-\s*\d+\b/)
  if (keyMatch) {
    const eventKey = keyMatch[0].replace(/\s+/g, '')
    const event = eventDictionary.find((item) => item.eventKey === eventKey)
    return event ? { event, candidates: [event], ambiguousText: keyMatch[0] } : { event: null, candidates: [] }
  }

  const exactNameMatches = uniqueEvents(eventDictionary.filter((event) => normalizeEventText(event.name) === query))
  if (exactNameMatches.length > 0) {
    return fromCandidates(exactNameMatches, text)
  }

  const exactAliasMatches = uniqueEvents(eventDictionary.filter((event) =>
    (event.aliases ?? []).some((alias) => normalizeEventText(alias) === query)
  ))
  if (exactAliasMatches.length > 0) {
    return fromCandidates(exactAliasMatches, text)
  }

  const containedPhraseMatches = matchContainedEventPhrases(normalizedText)
  if (containedPhraseMatches.length > 0) {
    return fromCandidates(containedPhraseMatches, text)
  }

  const broadMatches = matchBroadEventPhrases(query)
  return fromCandidates(broadMatches, query || text)
}

export function describeEvent(event: EventDefinition): string {
  const parts = [`${event.eventKey} ${event.name}`]

  if (event.action) {
    parts.push(`action=${event.action}`)
  }

  if (event.actionValueMeaning) {
    parts.push(`actionValue 表示${event.actionValueMeaning}`)
  }

  return parts.join('，')
}

function stripQueryWords(text: string): string {
  return text
    .replace(/查询|检索|筛选|统计|日志|明细|数据|记录|事件|上报/g, '')
    .replace(/的是|是|为|等于|包含|关于|相关/g, '')
    .replace(/按.+分组/g, '')
}

function matchContainedEventPhrases(normalizedText: string): EventDefinition[] {
  const matches: Array<{ event: EventDefinition; length: number }> = []

  eventDictionary.forEach((event) => {
    const terms = [event.name, ...(event.aliases ?? [])]
    terms.forEach((term) => {
      const normalizedTerm = normalizeEventText(term)
      if (normalizedTerm && normalizedText.includes(normalizedTerm)) {
        matches.push({ event, length: normalizedTerm.length })
      }
    })
  })

  if (matches.length === 0) {
    return []
  }

  const maxLength = Math.max(...matches.map((match) => match.length))
  return uniqueEvents(matches.filter((match) => match.length === maxLength).map((match) => match.event))
}

function matchBroadEventPhrases(query: string): EventDefinition[] {
  if (!query) {
    return []
  }

  if (query === '广告') {
    return eventDictionary.filter((event) => ['5-1', '6-1', '7-1'].includes(event.eventKey))
  }

  return uniqueEvents(eventDictionary.filter((event) => {
    const terms = [event.name, ...(event.aliases ?? [])]
    return terms.some((term) => normalizeEventText(term).includes(query))
  }))
}

function fromCandidates(candidates: EventDefinition[], ambiguousText?: string): EventMatchResult {
  if (candidates.length === 1) {
    return { event: candidates[0], candidates, ambiguousText }
  }

  return { event: null, candidates, ambiguousText }
}

function uniqueEvents(events: EventDefinition[]): EventDefinition[] {
  const seen = new Set<string>()
  return events.filter((event) => {
    if (seen.has(event.eventKey)) {
      return false
    }

    seen.add(event.eventKey)
    return true
  })
}
