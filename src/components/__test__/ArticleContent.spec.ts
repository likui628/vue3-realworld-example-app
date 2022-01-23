import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import fixtures from '../../utils/test/fixtures'
import ArticleContent from '../ArticleContent.vue'

describe('ArticleContent', () => {
  let wrapper: VueWrapper<any>

  const findArticleBody = () => wrapper.find('.col-xs-12')

  function createComponent() {
    wrapper = mount(ArticleContent, {
      props: { article: { ...fixtures.article, body: fixtures.markdown } },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render markdown correctly', async () => {
    createComponent()

    await flushPromises()

    expect(wrapper.findAll('.tag-pill')).toHaveLength(2)
    expect(findArticleBody().html()).toMatchSnapshot()
  })
})
