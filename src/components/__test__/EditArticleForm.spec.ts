import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { router, routerPush } from '../../router'
import { getArticleBySlug } from '../../services/article/getArticle'
import { postArticle } from '../../services/article/postArticle'
import asyncComponentWrapper from '../../utils/test/async-component-wrapper'
import fixtures from '../../utils/test/fixtures'
import EditArticleForm from '../EditArticleForm.vue'

jest.mock('src/services/article/postArticle')
jest.mock('src/services/article/getArticle')

describe('EditArticleForm', () => {
  const mockPostArticle = postArticle as jest.MockedFunction<typeof postArticle>
  const mockGetArticle = getArticleBySlug as jest.MockedFunction<
    typeof getArticleBySlug
  >
  beforeEach(async () => {
    await routerPush('create-article', { slug: '' })
  })

  it('should render empty form', async () => {
    const wrapper = mount(asyncComponentWrapper(EditArticleForm), {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render the article values ', async () => {
    await routerPush('article', { slug: 'article-slug' })
    mockGetArticle.mockResolvedValue({ ...fixtures.article })

    const wrapper = mount(asyncComponentWrapper(EditArticleForm), {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    await flushPromises()

    expect(
      (wrapper.get('[data-test="title"]').element as HTMLInputElement).value
    ).toBe(fixtures.article.title)

    expect(
      (wrapper.get('[data-test="description"]').element as HTMLInputElement)
        .value
    ).toBe(fixtures.article.description)

    expect(
      (wrapper.get('[data-test="body"]').element as HTMLInputElement).value
    ).toBe(fixtures.article.body)

    expect(wrapper.findAll('.tag-default')).toHaveLength(
      fixtures.article.tagList.length
    )
  })

  test('post a new article', async () => {
    const wrapper = mount(asyncComponentWrapper(EditArticleForm), {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })
    await flushPromises()

    const titleInput = wrapper.get('[data-test="title"]')
    titleInput.setValue('title')

    const descriptionInput = wrapper.get('[data-test="description"]')
    descriptionInput.setValue('description')

    const bodyInput = wrapper.get('[data-test="body"]')
    bodyInput.setValue('body')

    const newTagInput = wrapper.get('[data-test="newTag"]')
    newTagInput.setValue('tag1')
    newTagInput.trigger('keydown.enter')

    await wrapper.get('[type="submit"]').trigger('submit')

    expect(mockPostArticle).toBeCalledWith({
      body: 'body',
      description: 'description',
      tagList: ['tag1'],
      title: 'title',
    })
  })
})
