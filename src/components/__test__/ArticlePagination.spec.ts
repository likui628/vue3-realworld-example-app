import { mount, VueWrapper } from '@vue/test-utils'
import ArticlePagination from '../ArticlePagination.vue'

describe('ArticlePagination.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent(props: any) {
    wrapper = mount(ArticlePagination, { props })
  }

  afterEach(() => {
    wrapper.unmount()
  })
  
  test('should highlight current active page', () => {
    createComponent({ page: 2, count: 15 })

    const pageItems = wrapper.findAll('.page-item')

    expect(pageItems).toHaveLength(2)
    expect(pageItems[1].classes()).toContain('active')
  })

  test('should call onPageChange when click a page item', async () => {
    createComponent({ page: 1, count: 15 })

    const page2 = wrapper.get('[aria-label="Go to page 2"]')
    await page2.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('page-change')
  })
})
