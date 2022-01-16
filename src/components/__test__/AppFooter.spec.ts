import { mount } from '@vue/test-utils'
import { router } from '../../router'
import AppFooter from '../AppFooter.vue'

describe('AppFooter', () => {
  it('should have home link', () => {
    const wrapper = mount(AppFooter, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.html()).toContain('conduit')
    expect(wrapper.find('[href="#/"]')).toBeTruthy()
  })
})
