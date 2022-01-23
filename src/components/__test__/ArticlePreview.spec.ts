import { mount, VueWrapper } from '@vue/test-utils'
import ArticlePreview from '../ArticlePreview.vue'
import { router } from '../../router'
import fixtures from '../../utils/test/fixtures'

const mockFavoriteArticle = jest.fn()
jest.mock('src/composable/useFavoriteArticle', () => ({
  useFavoriteArticle: () => ({
    favoriteArticle: mockFavoriteArticle,
  }),
}))

describe('ArticlePreview', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(ArticlePreview, {
      props: {
        article: fixtures.article,
      },
      global: {
        plugins: [router],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  test('should call favorite method when click favorite button', () => {
    createComponent()

    wrapper.find('.btn-outline-primary').trigger('click')

    expect(wrapper.find('[href="#/@Gerome"]')).toBeTruthy()
    expect(wrapper.find('[href="#/article/article-slug-1"]')).toBeTruthy()
    expect(wrapper.findAll('.tag-default')).toHaveLength(2)
    expect(mockFavoriteArticle).toBeCalledTimes(1)
  })
})
