import { ref } from 'vue'

export function useCopy() {
  const copied = ref(false)

  async function copyText(text: string) {
    if (!text || typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    await navigator.clipboard.writeText(text)
    copied.value = true

    window.setTimeout(() => {
      copied.value = false
    }, 1500)
  }

  return {
    copied,
    copyText,
  }
}
