import { ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import {
  postFavoriteArticle,
  deleteFavoriteArticle,
} from '../services/article/favoriteArticle'
import { userStore } from '../store/user'

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  onUpdate: (newArticle: Article) => void
}

export function useFavoriteArticle({
  isFavorited,
  articleSlug,
  onUpdate,
}: useFavoriteArticleProps) {
  let response = null
  const favoriteArticlePending = ref(false)
  const store = userStore()
  const router = useRouter()

  const favoriteArticle = async () => {
    if (!store.user) {
      router.push('/login')
      return
    }

    favoriteArticlePending.value = true
    try {
      if (isFavorited.value) {
        response = await deleteFavoriteArticle(articleSlug.value)
      } else {
        response = await postFavoriteArticle(articleSlug.value)
      }
      onUpdate(response.article)
    } finally {
      favoriteArticlePending.value = false
    }
  }
  return { favoriteArticlePending, favoriteArticle }
}
