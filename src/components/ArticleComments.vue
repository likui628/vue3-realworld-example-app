<template>
  <ArticleCommentsForm :article-slug="props.slug" @add-comment="addComment" />

  <ArticleComment
    :comment="comment"
    :article-slug="props.slug"
    @delete="delComment(comment.id)"
    v-for="comment in comments"
    :key="comment.id"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getCommentsBySlug } from '../services/comment/getComments'
import { deleteComment } from '../services/comment/postComment'
import ArticleComment from './ArticleComment.vue'
import ArticleCommentsForm from './ArticleCommentsForm.vue'

interface Props {
  slug: string
}
const props = defineProps<Props>()

const comments = ref<Comment[]>()

const delComment = async (commentId: number) => {
  await deleteComment(props.slug, commentId)
  comments.value = comments.value?.filter((c) => c.id !== commentId)
}

comments.value = await getCommentsBySlug(props.slug)

const addComment = (newComment: Comment) => {
  comments.value?.unshift(newComment)
}
</script>
