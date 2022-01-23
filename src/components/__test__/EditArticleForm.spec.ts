import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { router, routerPush } from '../../router'
import { getArticleBySlug } from '../../services/article/getArticle'
import { postArticle } from '../../services/article/postArticle'
import asyncComponentWrapper from '../../utils/test/async-component-wrapper'
import fixtures from '../../utils/test/fixtures'
import EditArticleForm from '../EditArticleForm.vue'

jest.mock('src/services/article/postArticle')
jest.mock('src/services/article/getArticle')

describe('EditArticleForm', () => {
  let wrapper: VueWrapper<any>

  const findSubmitButton = () => wrapper.get('[type="submit"]')

  function getFieldset(field: string) {
    return wrapper.get(`[data-test="${field}"]`)
  }

  function getInput(field: string): HTMLInputElement {
    return wrapper.get(`[data-test="${field}"]`).element as HTMLInputElement
  }

  function createComponent() {
    wrapper = mount(asyncComponentWrapper(EditArticleForm), {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  const mockPostArticle = postArticle as jest.MockedFunction<typeof postArticle>
  const mockGetArticle = getArticleBySlug as jest.MockedFunction<
    typeof getArticleBySlug
  >
  beforeEach(async () => {
    await routerPush('create-article', { slug: '' })
  })

  it('should render empty form', async () => {
    createComponent()

    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render the article values ', async () => {
    await routerPush('article', { slug: 'article-slug' })
    mockGetArticle.mockResolvedValue({ ...fixtures.article })

    createComponent()

    await flushPromises()

    expect(getInput('title').value).toBe(fixtures.article.title)

    expect(getInput('description').value).toBe(fixtures.article.description)

    expect(getInput('body').value).toBe(fixtures.article.body)

    expect(wrapper.findAll('.tag-default')).toHaveLength(
      fixtures.article.tagList.length
    )
  })

  test('post a new article', async () => {
    createComponent()

    await flushPromises()

    getFieldset('title').setValue('title')

    getFieldset('description').setValue('description')

    getFieldset('body').setValue('body')

    const newTagInput = wrapper.get('[data-test="newTag"]')
    newTagInput.setValue('tag1')
    newTagInput.trigger('keydown.enter')

    await findSubmitButton().trigger('submit')

    expect(mockPostArticle).toBeCalledWith({
      body: 'body',
      description: 'description',
      tagList: ['tag1'],
      title: 'title',
    })
  })
})
