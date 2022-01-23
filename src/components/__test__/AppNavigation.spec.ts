import { userStore } from './../../store/user'
import { createTestingPinia } from '@pinia/testing'
import { router } from '../../router'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import AppNavigation from '../AppNavigation.vue'
import fixtures from '../../utils/test/fixtures'

beforeEach(async () => {
  await router.push('/')
})

describe('AppNavigation.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(AppNavigation, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  test('when user not logged', () => {
    createComponent()

    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('Sign in')
    expect(wrapper.html()).toContain('Sign up')
  })

  test('when user logged', async () => {
    createComponent()

    const store = userStore()
    store.user = fixtures.user

    await flushPromises()
    expect(wrapper.findAll('.nav-item')).toHaveLength(4)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('New Article')
    expect(wrapper.html()).toContain('Settings')
    expect(wrapper.html()).toContain('foo')
  })
})
