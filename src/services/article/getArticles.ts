import { limit, request } from '../index'

export function getArticles(page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getArticlesByTag(
  tagName: string,
  page = 1
): Promise<ArticlesResponse> {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getArticlesByFeed(page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles/feed', { params })
}

export function getArticlesByAuthor(
  authorName: string,
  page = 1
): Promise<ArticlesResponse> {
  const params = { author: authorName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getArticlesByFavorited(
  userName: string,
  page = 1
): Promise<ArticlesResponse> {
  const params = { favorited: userName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}
