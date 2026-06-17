interface GtagComposable {
  gtag: (command: 'event', action: string, params: Record<string, string | number>) => void
}

declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params: Record<string, string | number>) => void
  }
}

export function useTrackEvent() {
  function trackToolEvent(toolName: string, action: string, label?: string, value?: number) {
    if (!import.meta.client) return

    const params: Record<string, string | number> = {
      tool_name: toolName,
    }

    if (label) params.label = label
    if (typeof value === 'number') params.value = value

    // @ts-ignore useGtag is auto-imported when nuxt-gtag is available.
    if (typeof useGtag === 'function') {
      // @ts-ignore useGtag is auto-imported when nuxt-gtag is available.
      const { gtag } = useGtag() as GtagComposable
      gtag('event', action, params)
      return
    }

    window.gtag?.('event', action, params)
  }

  return {
    trackToolEvent,
  }
}
