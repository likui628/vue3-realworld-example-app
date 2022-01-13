import { ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../store/user'
import {
  postFavoriteArticle,
  deleteFavoriteArticle,
} from '../services/article/favoriteArticle'

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
  const favoriteArticlePending = ref(false)
  const store = userStore()
  const router = useRouter()

  const favoriteArticle = async () => {
    if (!store.user) {
      return await router.push('/login')
    }

    favoriteArticlePending.value = true
    try {
      const func = isFavorited.value
        ? deleteFavoriteArticle
        : postFavoriteArticle

      onUpdate(await func(articleSlug.value))
    } finally {
      favoriteArticlePending.value = false
    }
  }
  return { favoriteArticlePending, favoriteArticle }
}
