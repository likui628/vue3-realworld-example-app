import { ref } from 'vue'
import { getAllTags } from '../services/tag/getTags'

export function useTags() {
  const tags = ref<string[]>([])

  async function fetchTags(): Promise<void> {
    tags.value = await getAllTags()
  }

  return {
    fetchTags,
    tags,
  }
}
