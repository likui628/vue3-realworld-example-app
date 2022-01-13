import { request } from '../index'

export function postFavoriteArticle(slug: string): Promise<Article> {
  return request
    .post<ArticleResponse>(`/articles/${slug}/favorite`)
    .then((r) => r.article)
}

export function deleteFavoriteArticle(slug: string): Promise<Article> {
  return request
    .delete<ArticleResponse>(`/articles/${slug}/favorite`)
    .then((r) => r.article)
}
