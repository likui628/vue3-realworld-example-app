const user: User = {
  id: 1,
  username: 'foo',
  email: 'a@b.c',
  token: 'token',
  bio: undefined,
  image: undefined,
}

const profile: Profile = {
  username: 'Gerome',
  bio: '',
  image: 'https://api.realworld.io/images/demo-avatar.png',
  following: false,
}

const article: Article = {
  author: {
    bio: '',
    following: false,
    image: 'https://api.realworld.io/images/demo-avatar.png',
    username: 'Gerome',
  },
  body: 'Over 100 implementations have been created using various languages, libraries, and frameworks.\n\nExplore them on CodebaseShow.',
  createdAt: '2021-11-24T12:11:07.952Z',
  description:
    'discover the implementations created by the RealWorld community',
  favorited: false,
  favoritesCount: 429,
  slug: 'article-slug-1',
  tagList: ['codebaseShow', 'implementations'],
  title: 'Explore implementations',
  updatedAt: '2021-11-24T12:11:07.952Z',
}

export default {
  user,
  profile,
  article,
}
