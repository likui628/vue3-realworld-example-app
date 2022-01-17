import { flushPromises, mount } from '@vue/test-utils'
import fixtures from '../../utils/test/fixtures'
import ArticleContent from '../ArticleContent.vue'

describe('ArticleContent', () => {
  it('should render markdown correctly', async () => {
    const wrapper = mount(ArticleContent, {
      props: { article: { ...fixtures.article, body: fixtures.markdown } },
    })

    await flushPromises()

    expect(wrapper.findAll('.tag-pill')).toHaveLength(2)

    const articleBody = wrapper.find('.col-xs-12')
    expect(articleBody.html()).toMatchSnapshot()
  })
})
