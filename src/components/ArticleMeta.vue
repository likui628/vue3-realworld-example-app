<template>
  <AppLink name="profile" :params="{ username: article.author.username }">
    <img :src="article.author.image || $config.DEFAULT_AVATAR" />
  </AppLink>

  <div class="info">
    <AppLink
      name="profile"
      :params="{ username: article.author.username }"
      class="author"
    >
      {{ article.author.username }}
    </AppLink>
    <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
  </div>

  <template v-if="showEdit">
    <AppLink
      name="edit-article"
      :params="{ slug: article.slug }"
      class="btn btn-outline-secondary btn-sm"
    >
      <i class="ion-edit"></i>
      &nbsp; Edit Article
    </AppLink>
    &nbsp;&nbsp;
    <button @click="onDelete" class="btn btn-outline-danger btn-sm">
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </template>
  <template v-else>
    <button
      @click="() => followProfile()"
      :disabled="followPending"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
      {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      @click="() => favoriteArticle()"
      :disabled="favoriteArticlePending"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ isFavorited ? 'Unfavorite' : 'Favorite' }} Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useFavoriteArticle } from '../composable/useFavoriteArticle'
import { useFollow } from '../composable/useFollow'
import { routerPush } from '../router'
import { deleteArticle } from '../services/article/deleteArticle'
import { userStore } from '../store/user'
import AppLink from './AppLink.vue'

interface Props {
  article: Article
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update-article', newArticle: Article): void
}
const emit = defineEmits<Emits>()

const store = userStore()

const showEdit = computed(
  () => props.article.author.username === store.user?.username
)

const isFavorited = computed(() => props.article.favorited)
const articleSlug = computed(() => props.article.slug)

const { favoriteArticlePending, favoriteArticle } = useFavoriteArticle({
  isFavorited,
  articleSlug,
  onUpdate: (newArticle) => {
    emit('update-article', newArticle)
  },
})

const isFollowing = computed(() => props.article.author.following)
const username = computed(() => props.article.author.username)

const { followPending, followProfile } = useFollow({
  isFollowing,
  username,
  onUpdate: (author) => {
    const newArticle = { ...props.article, author }
    emit('update-article', newArticle)
  },
})

const onDelete = async () => {
  await deleteArticle(props.article.slug)
  await routerPush('global-feed')
}
</script>
