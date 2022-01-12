<template>
  <form class="card comment-form">
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
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { postComment } from '../services/comment/postComment'
import { userStore } from '../store/user'

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
