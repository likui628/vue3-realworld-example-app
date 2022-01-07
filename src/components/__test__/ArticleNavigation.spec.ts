import { ref } from 'vue'
import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount } from '@vue/test-utils'
import ArticleNavigation from '../ArticleNavigation.vue'
import fixtures from '../../utils/test/fixtures'

jest.mock('src/composable/useArticles', () => ({
  useArticles: () => ({
    tag: ref('tag-feed'),
    username: ref('Gerome'),
  }),
}))

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
    store.user = fixtures.user
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
