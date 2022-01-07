import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  getArticles,
  getArticlesByTag,
  getArticlesByFeed,
  getArticlesByAuthor,
  getArticlesByFavorited,
} from '../services/article/getArticles'
import { userStore } from '../store/user'

export function useArticles() {
  const store = userStore()

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)

  async function fetchArticles(): Promise<void> {
    let responsePromise: null | Promise<ArticlesResponse> = null

    if (routeName.value === 'tag' && tag.value !== undefined) {
      responsePromise = getArticlesByTag(tag.value, page.value)
    }

    if (routeName.value === 'global-feed') {
      responsePromise = getArticles(page.value)
    }

    if (routeName.value === 'feed' && store.user) {
      responsePromise = getArticlesByFeed(page.value)
    }

    if (routeName.value === 'profile' && username.value) {
      responsePromise = getArticlesByAuthor(username.value, page.value)
    }

    if (routeName.value === 'profile-favorites' && username.value) {
      responsePromise = getArticlesByFavorited(username.value, page.value)
    }

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    }
  }

  const page = ref(1)
  async function changePage(value: number) {
    page.value = value
  }
  watch(page, fetchArticles)

  const updateArticle = (index: number, article: Article): void => {
    articles.value[index] = article
  }

  const { tag, username, routeName } = useMetaChange(fetchArticles)

  return {
    page,
    tag,
    username,
    changePage,
    fetchArticles,
    articles,
    articlesCount,
    updateArticle,
  }
}

function useMetaChange(callbackFunc: Function) {
  const route = useRoute()

  const routeName = computed(() => route.name)
  const username = computed(() =>
    typeof route.params.username === 'string' ? route.params.username : ''
  )
  const tag = computed(() =>
    typeof route.params.tag === 'string' ? route.params.tag : ''
  )

  watch([routeName, username, tag], () => {
    callbackFunc()
  })

  return { routeName, username, tag }
}
