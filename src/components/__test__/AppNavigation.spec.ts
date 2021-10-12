import { store, key } from '../../store'
import { router } from '../../router'
import { mount } from '@vue/test-utils'
import AppNavigation from '../AppNavigation.vue'

beforeEach(async () => {
  store.commit('updateUser', null)
  await router.push('/')
})

describe('AppNavigation.vue', () => {
  test('when user not logged', () => {
    const wrapper = mount(AppNavigation, {
      global: {
        plugins: [router, [store, key]],
      },
    })
    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('Sign in')
    expect(wrapper.html()).toContain('Sign up')
  })

  test('when user logged', async () => {
    store.commit('updateUser', {
      id: 1,
      username: 'foo',
      email: 'a@b.c',
      token: 'token',
      bio: undefined,
      image: undefined,
    })
    const wrapper = mount(AppNavigation, {
      global: {
        plugins: [router, [store, key]],
      },
    })

    expect(wrapper.findAll('.nav-item')).toHaveLength(4)
    expect(wrapper.html()).toContain('Home')
    expect(wrapper.html()).toContain('New Article')
    expect(wrapper.html()).toContain('Settings')
    expect(wrapper.html()).toContain('foo')
  })
})
