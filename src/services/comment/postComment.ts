import { request } from '../index'

export function postComment(slug: string, body: string): Promise<ArticleComment> {
  return request
    .post<CommentResponse>(`/articles/${slug}/comments`, {
      comment: { body },
    })
    .then((r) => r.comment)
}

export function deleteComment(slug: string, commentId: number): Promise<void> {
  return request.delete(`/articles/${slug}/comments/${commentId}`)
}
