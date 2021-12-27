import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount } from '@vue/test-utils'
import ArticleNavigation from '../ArticleNavigation.vue'

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
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    expect(wrapper.findAll('.nav-item')).toHaveLength(1)
    expect(wrapper.html()).toContain('Global Feed')
  })

  test('when user logged', async () => {
    const wrapper = mount(ArticleNavigation, {
      props: { tag: 'this is a tag' },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    const store = userStore()
    store.user = mockUser

    await flushPromises()

    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Your Feed')
    expect(wrapper.html()).toContain('Global Feed')
    expect(wrapper.html()).toContain('this is a tag')
  })
})
