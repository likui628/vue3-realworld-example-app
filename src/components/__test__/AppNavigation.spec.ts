import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount } from '@vue/test-utils'
import AppNavigation from '../AppNavigation.vue'

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

describe('AppNavigation.vue', () => {
  test('when user not logged', () => {
    const wrapper = mount(AppNavigation, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('Sign in')
    expect(wrapper.html()).toContain('Sign up')
  })

  test('when user logged', async () => {
    const wrapper = mount(AppNavigation, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    const store = userStore()
    store.user = mockUser

    await flushPromises()
    expect(wrapper.findAll('.nav-item')).toHaveLength(4)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('New Article')
    expect(wrapper.html()).toContain('Settings')
    expect(wrapper.html()).toContain('foo')
  })
})
