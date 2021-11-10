import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticles } from '../services/article/getArticles'

export function useArticles() {
  const page = ref(1)
  async function changePage(value: number) {
    page.value = value
  }

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)

  async function fetchArticles(): Promise<void> {
    let responsePromise: null | Promise<ArticlesResponse> = null

    responsePromise = getArticles(page.value)

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    }
  }
  const route = useRoute()
  const tag = ref('')
  watch(
    () => route.params.tag,
    (tagParam) => {
      if (tagParam !== tag.value) {
        tag.value = typeof tagParam === 'string' ? tagParam : ''
      }
    },
    { immediate: true }
  )

  watch(page, fetchArticles)

  return {
    page,
    tag,
    changePage,
    fetchArticles,
    articles,
    articlesCount,
  }
}
