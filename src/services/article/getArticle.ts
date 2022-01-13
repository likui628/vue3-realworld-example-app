import { request } from '../index'

export function getArticleBySlug(slug: string): Promise<Article> {
  return request
    .get<ArticleResponse>(`/articles/${slug}`)
    .then((r) => r.article)
}
