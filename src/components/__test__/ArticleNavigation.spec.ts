import { store, key } from '../../store'
import { router } from '../../router'
import { mount } from '@vue/test-utils'
import ArticleNavigation from '../ArticleNavigation.vue'

beforeEach(async () => {
  store.commit('updateUser', null)
  await router.push('/')
})

describe('ArticleNavigation.vue', () => {
  test('when user not logged', () => {
    const wrapper = mount(ArticleNavigation, {
      global: {
        plugins: [router, [store, key]],
      },
    })
    expect(wrapper.findAll('.nav-item')).toHaveLength(1)
    expect(wrapper.html()).toContain('Global Feed')
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
    const wrapper = mount(ArticleNavigation, {
      props: { tag: 'this is a tag' },
      global: {
        plugins: [router, [store, key]],
      },
    })
  
    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.html()).toContain('Your Feed')
    expect(wrapper.html()).toContain('Global Feed')
    expect(wrapper.html()).toContain('this is a tag')
  })
})
