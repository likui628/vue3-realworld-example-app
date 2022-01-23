import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { router } from '../../router'
import { postComment } from '../../services/comment/postComment'
import { userStore } from '../../store/user'
import fixtures from '../../utils/test/fixtures'
import ArticleCommentForm from '../ArticleCommentForm.vue'

jest.mock('src/services/comment/postComment')

describe('ArticleCommentForm', () => {
  let wrapper: VueWrapper<any>

  const mockPostComment = postComment as jest.MockedFunction<typeof postComment>
  
  const findSubmitButton = () => wrapper.find('button')
  const findTextarea = () => wrapper.find('textarea')

  function createComponent() {
    wrapper = mount(ArticleCommentForm, {
      props: {
        articleSlug: 'slug',
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should display sign up sign in ', () => {
    createComponent()

    expect(wrapper.find('[href="#/login"]')).toBeTruthy()
    expect(wrapper.find('[href="#/register"]')).toBeTruthy()
  })

  test('post a comment', async () => {
    createComponent()

    const store = userStore()
    store.user = fixtures.user
    await flushPromises()

    await findTextarea().setValue('input some texts')

    await findSubmitButton().trigger('click')
    expect(mockPostComment).toBeCalledWith('slug', 'input some texts')
    expect(wrapper.emitted()).toHaveProperty('add-comment')
  })
})
