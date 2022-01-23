import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { router } from '../../router'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleComment from '../ArticleComment.vue'

describe('ArticleComment', () => {
  let wrapper: VueWrapper<any>
  const findDeleteButton = () => wrapper.find('.ion-trash-a')

  function createComponent(props: any) {
    wrapper = mount(ArticleComment, {
      props,
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should show comment', () => {
    createComponent({
      comment: fixtures.comment,
    })

    expect(wrapper.html()).toContain(fixtures.comment.body)
    expect(wrapper.html()).toContain(fixtures.comment.author.username)
  })

  test('delete article', async () => {
    createComponent({
      comment: fixtures.comment,
    })

    const store = userStore()
    store.user = {
      ...fixtures.user,
      username: fixtures.comment.author.username,
    }
    await flushPromises()

    findDeleteButton().trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
  })
})
