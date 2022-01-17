import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { router } from '../../router'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleMeta from '../ArticleMeta.vue'

describe('ArticleMeta', () => {
  it('should render follow and favorite', async () => {
    const wrapper = mount(ArticleMeta, {
      props: {
        article: fixtures.article,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    await flushPromises()

    expect(wrapper.find('ion-plus-round')).toBeTruthy()
    expect(wrapper.find('ion-heart')).toBeTruthy()
  })

  it('should render edit and delete', async () => {
    const wrapper = mount(ArticleMeta, {
      props: {
        article: fixtures.article,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    const store = userStore()
    store.user = {
      ...fixtures.user,
      username: fixtures.article.author.username,
    }

    await flushPromises()

    expect(wrapper.find('ion-edit')).toBeTruthy()
    expect(wrapper.find('ion-trash-a')).toBeTruthy()
  })
})
