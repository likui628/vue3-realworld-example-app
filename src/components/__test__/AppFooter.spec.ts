import { mount, VueWrapper } from '@vue/test-utils'
import { router } from '../../router'
import AppFooter from '../AppFooter.vue'

describe('AppFooter', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(AppFooter, {
      global: {
        plugins: [router],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should have home link', () => {
    createComponent()

    expect(wrapper.html()).toContain('conduit')
    expect(wrapper.find('[href="#/"]')).toBeTruthy()
  })
})
