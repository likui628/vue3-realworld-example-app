import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { router, routerPush } from '../../router'
import { getCommentsBySlug } from '../../services/comment/getComments'
import { userStore } from '../../store/user'
import asyncComponentWrapper from '../../utils/test/async-component-wrapper'
import fixtures from '../../utils/test/fixtures'
import ArticleComments from '../ArticleComments.vue'
import ArticleComment from '../ArticleComment.vue'

jest.mock('src/services/comment/getComments')
jest.mock('src/services/comment/postComment', () => ({
  deleteComment: jest.fn(),
}))

describe('ArticleComments', () => {
  let wrapper: VueWrapper<any>

  const findDeleteButton = () => wrapper.find('.ion-trash-a')

  const mockGetCommentsBySlug = getCommentsBySlug as jest.MockedFunction<
    typeof getCommentsBySlug
  >

  function createComponent() {
    wrapper = mount(asyncComponentWrapper(ArticleComments), {
      global: {
        stubs: {
          ArticleCommentForm: true,
          ArticleComment: false,
        },
        plugins: [router, createTestingPinia()],
      },
    })
  }

  beforeEach(async () => {
    mockGetCommentsBySlug.mockResolvedValue([
      fixtures.comment,
      fixtures.comment2,
    ])
    await routerPush('article', { slug: fixtures.article.slug })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('delete a comment ', async () => {
    createComponent()

    const store = userStore()
    store.user = {
      ...fixtures.user,
      username: fixtures.comment.author.username,
    }
    await flushPromises()

    expect(wrapper.findAllComponents(ArticleComment)).toHaveLength(2)
    await findDeleteButton().trigger('click')

    expect(wrapper.findAllComponents(ArticleComment)).toHaveLength(1)
  })
})
