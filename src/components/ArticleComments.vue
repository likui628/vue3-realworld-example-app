<template>
  <ArticleCommentForm :article-slug="slug" @add-comment="addComment" />

  <ArticleComment
    :comment="comment"
    @delete="delComment(comment.id)"
    v-for="comment in comments"
    :key="comment.id"
  />
</template>

<script lang="ts">
export default {
  name: 'ArticleComments',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCommentsBySlug } from '../services/comment/getComments'
import { deleteComment } from '../services/comment/postComment'
import ArticleComment from './ArticleComment.vue'
import ArticleCommentForm from './ArticleCommentForm.vue'

const route = useRoute()
const slug = route.params.slug as string

const comments = ref<ArticleComment[]>()

const delComment = async (commentId: number) => {
  await deleteComment(slug, commentId)
  comments.value = comments.value?.filter((c) => c.id !== commentId)
}

comments.value = await getCommentsBySlug(slug)

const addComment = (newComment: ArticleComment) => {
  comments.value?.unshift(newComment)
}
</script>
