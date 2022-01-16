<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <AppLink
        name="profile"
        :params="{ username: comment.author.username }"
        class="comment-author"
      >
        <img
          :src="comment.author.image|| $config.DEFAULT_AVATAR"
          class="comment-author-img"
        />
      </AppLink>
      &nbsp;
      <AppLink
        name="profile"
        :params="{ username: comment.author.username }"
        class="comment-author"
      >
        {{ comment.author.username }}
      </AppLink>
      <span class="date-posted">
        {{ new Date(comment.createdAt).toDateString() }}
      </span>
      <span class="mod-options" v-if="canModify">
        <i class="ion-trash-a" @click="emit('delete')" />
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { userStore } from '../store/user'
import AppLink from './AppLink.vue'

interface Props {
  comment: ArticleComment
}
const { comment } = defineProps<Props>()

const store = userStore()

const canModify = computed(
  () => store.user?.username === comment.author.username
)

const emit = defineEmits<{
  (e: 'delete'): boolean
}>()
</script>
