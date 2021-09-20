import { ref } from 'vue'
import { getAllTags } from '../services/tag/getTags'

export function useTags() {
  const tags = ref<String[]>([])
  async function fetchTags(): Promise<void> {
    tags.value = []
    tags.value = await getAllTags()
  }

  return {
    fetchTags,
    tags,
  }
}
