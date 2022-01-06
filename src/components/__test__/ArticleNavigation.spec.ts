import { ref } from 'vue'
import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount } from '@vue/test-utils'
import ArticleNavigation from '../ArticleNavigation.vue'

jest.mock('src/composable/useArticles', () => ({
  useArticles: () => ({
    tag: ref('tag-feed'),
    username: ref('Gerome'),
  }),
}))

const mockUser = {
  id: 1,
  username: 'foo',
  email: 'a@b.c',
  token: 'token',
  bio: undefined,
  image: undefined,
}

beforeEach(async () => {
  await router.push('/')
})

describe('ArticleNavigation.vue', () => {
  test('when user not logged', () => {
    const wrapper = mount(ArticleNavigation, {
      props: {
        useGlobalFeed: true,
        useMyFeed: true,
        useTagFeed: true,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  
    expect(wrapper.findAll('.nav-item')).toHaveLength(2)
    expect(wrapper.html()).toContain('Global Feed')
    expect(wrapper.html()).toContain('tag-feed')
  })

  test('when user logged', async () => {
    const wrapper = mount(ArticleNavigation, {
      props: {
        useGlobalFeed: true,
        useMyFeed: true,
        useTagFeed: true,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    const store = userStore()
    store.user = mockUser
    await router.push('/tag/tag-feed')

    await flushPromises()

    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Your Feed')
    expect(wrapper.html()).toContain('Global Feed')
    expect(wrapper.html()).toContain('tag-feed')
  })

  test('when go to profile page', async () => {
    const wrapper = mount(ArticleNavigation, {
      props: {
        useUserFavorited: true,
        useUserFeed: true,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    await router.push('/@Gerome')

    expect(wrapper.findAll('.nav-item')).toHaveLength(2)
    expect(wrapper.html()).toContain('My Articles')
    expect(wrapper.html()).toContain('Favorited Articles')
  })
})
