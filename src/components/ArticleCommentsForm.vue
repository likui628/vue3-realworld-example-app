<template>
  <form v-if="store.user" class="card comment-form">
    <div class="card-block">
      <textarea
        v-model="comment"
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
      />
    </div>
    <div class="card-footer">
      <img
        :src="store.user?.image || $config.DEFAULT_AVATAR"
        class="comment-author-img"
      />
      <button class="btn btn-sm btn-primary" @click="addComment">
        Post Comment
      </button>
    </div>
  </form>
  <p v-else>
    <AppLink name="login">Sign in</AppLink> or
    <AppLink name="register">sign up</AppLink>to add comments on this article.
  </p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { postComment } from '../services/comment/postComment'
import { userStore } from '../store/user'
import AppLink from './AppLink.vue'

interface Props {
  articleSlug: string
}
interface Emits {
  (e: 'add-comment', comment: Comment): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const store = userStore()

const comment = ref('')

const addComment = async () => {
  const newComment = await postComment(props.articleSlug, comment.value)
  emit('add-comment', newComment)
  comment.value = ''
}
</script>
