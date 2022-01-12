import { request } from '../index'

export function getCommentsBySlug(slug: string): Promise<Comment[]> {
  return request
    .get<CommentsResponse>(`/articles/${slug}/comments`)
    .then((r) => r.comments)
}
