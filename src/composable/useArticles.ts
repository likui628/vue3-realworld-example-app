import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticles, getArticlesByTag } from '../services/article/getArticles'

export function useArticles() {
  const route = useRoute()

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)

  async function fetchArticles(): Promise<void> {
    let responsePromise: null | Promise<ArticlesResponse> = null

    if (route.name === 'tag' && tag.value !== undefined) {
      responsePromise = getArticlesByTag(tag.value, page.value)
    }

    if (route.name === 'global-feed') {
      responsePromise = getArticles(page.value)
    }

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    }
  }

  const tag = computed(() =>
    typeof route.params.tag === 'string' ? route.params.tag : ''
  )
  watch(tag, fetchArticles)

  const page = ref(1)
  async function changePage(value: number) {
    page.value = value
  }
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
