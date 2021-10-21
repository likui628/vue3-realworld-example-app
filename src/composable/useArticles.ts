import { ref, watch } from 'vue'
import { getArticles } from '../services/article/getArticles'

export function useArticles() {
  const page = ref(1)
  async function changePage(value: number) {
    page.value = value
  }

  const articles = ref<Article[]>([])
  async function fetchArticles(): Promise<void> {
    articles.value = await getArticles(page.value)
  }

  return {
    page,
    changePage,
    fetchArticles,
    articles,
  }
}
