import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { router } from '../../router'
import { postComment } from '../../services/comment/postComment'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleCommentForm from '../ArticleCommentForm.vue'

jest.mock('src/services/comment/postComment')

describe('ArticleCommentForm', () => {
  const mockPostComment = postComment as jest.MockedFunction<typeof postComment>
  it('should display sign up sign in ', () => {
    const wrapper = mount(ArticleCommentForm, {
      props: {
        articleSlug: 'slug',
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    expect(wrapper.find('[href="#/login"]')).toBeTruthy()
    expect(wrapper.find('[href="#/register"]')).toBeTruthy()
  })

  test('post a comment', async () => {
    const wrapper = mount(ArticleCommentForm, {
      props: {
        articleSlug: 'slug',
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    const store = userStore()
    store.user = fixtures.user
    await flushPromises()

    const textarea = wrapper.find('textarea')
    await textarea.setValue('input some texts')

    await wrapper.find('button').trigger('click')
    expect(mockPostComment).toBeCalledWith('slug', 'input some texts')
    expect(wrapper.emitted()).toHaveProperty('add-comment')
  })
})
