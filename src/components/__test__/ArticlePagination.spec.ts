import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ArticlePagination from '../ArticlePagination.vue'

describe('ArticlePagination.vue', () => {
  test('should highlight current active page', () => {
    const wrapper = mount(ArticlePagination, { props: { page: 2, count: 15 } })

    const pageItems = wrapper.findAll('.page-item')

    expect(pageItems).toHaveLength(2)
    expect(pageItems[1].classes()).toContain('active')
  })

  test('should call onPageChange when click a page item', async () => {
    const wrapper = mount(ArticlePagination, { props: { page: 1, count: 15 } })

    const page2 = wrapper.get('[aria-label="Go to page 2"]')
    await page2.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('page-change')
  })
})
