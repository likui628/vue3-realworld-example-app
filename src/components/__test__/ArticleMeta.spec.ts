import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { router } from '../../router'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleMeta from '../ArticleMeta.vue'

describe('ArticleMeta', () => {
  let wrapper: VueWrapper<any>

  const findFollow = () => wrapper.find('ion-plus-round')
  const findFavorite = () => wrapper.find('ion-heart')
  const findEdit = () => wrapper.find('ion-edit')
  const findDelete = () => wrapper.find('ion-trash-a')

  function createComponent() {
    wrapper = mount(ArticleMeta, {
      props: {
        article: fixtures.article,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render follow and favorite', async () => {
    createComponent()

    await flushPromises()

    expect(findFollow()).toBeTruthy()
    expect(findFavorite()).toBeTruthy()
  })

  it('should render edit and delete', async () => {
    createComponent()

    const store = userStore()
    store.user = {
      ...fixtures.user,
      username: fixtures.article.author.username,
    }

    await flushPromises()

    expect(findEdit()).toBeTruthy()
    expect(findDelete()).toBeTruthy()
  })
})
