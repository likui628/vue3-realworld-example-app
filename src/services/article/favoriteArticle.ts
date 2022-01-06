import { request } from '../index'

export function postFavoriteArticle(slug: string): Promise<ArticleResponse> {
  return request
    .post<ArticleResponse>(`/articles/${slug}/favorite`)
    .catch((error) => {
      throw error
    })
}

export function deleteFavoriteArticle(slug: string): Promise<ArticleResponse> {
  return request
    .delete<ArticleResponse>(`/articles/${slug}/favorite`)
    .catch((error) => {
      throw error
    })
}
