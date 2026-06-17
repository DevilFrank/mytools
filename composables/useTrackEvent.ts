type ToolEventParams = {
  toolName: string
  action: string
  label?: string
  value?: number
}

export function useTrackEvent() {
  const { gtag } = useGtag()

  function trackToolEvent(params: ToolEventParams) {
    if (!import.meta.client) return

    const payload: Record<string, string | number | boolean | undefined> = {
      tool_name: params.toolName,
      event_label: params.label,
      value: params.value,
    }

    if (process.dev) {
      payload.debug_mode = true
      console.log('[GA event]', params.action, payload)
    }

    gtag('event', params.action, payload)
  }

  return {
    trackToolEvent,
  }
}
