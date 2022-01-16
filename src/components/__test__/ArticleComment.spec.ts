import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { router } from '../../router'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleComment from '../ArticleComment.vue'

describe('ArticleComment', () => {
  it('should show comment', () => {
    const wrapper = mount(ArticleComment, {
      props: {
        comment: fixtures.comment,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    expect(wrapper.html()).toContain(fixtures.comment.body)
    expect(wrapper.html()).toContain(fixtures.comment.author.username)
  })

  test('delete article', async () => {
    const wrapper = mount(ArticleComment, {
      props: {
        comment: fixtures.comment,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    const store = userStore()
    store.user = {
      ...fixtures.user,
      username: fixtures.comment.author.username,
    }
    await flushPromises()

    wrapper.find('.ion-trash-a').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
  })
})
