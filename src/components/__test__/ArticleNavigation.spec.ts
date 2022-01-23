import { ref } from 'vue'
import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
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
  let wrapper: VueWrapper<any>

  function createComponent(props: any) {
    wrapper = mount(ArticleNavigation, {
      props,
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  test('when user not logged', () => {
    createComponent({
      useGlobalFeed: true,
      useMyFeed: true,
      useTagFeed: true,
    })

    expect(wrapper.findAll('.nav-item')).toHaveLength(2)
    expect(wrapper.html()).toContain('Global Feed')
    expect(wrapper.html()).toContain('tag-feed')
  })

  test('when user logged', async () => {
    createComponent({
      useGlobalFeed: true,
      useMyFeed: true,
      useTagFeed: true,
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
    createComponent({
      useUserFavorited: true,
      useUserFeed: true,
    })
    await router.push('/@Gerome')

    expect(wrapper.findAll('.nav-item')).toHaveLength(2)
    expect(wrapper.html()).toContain('My Articles')
    expect(wrapper.html()).toContain('Favorited Articles')
  })
})
