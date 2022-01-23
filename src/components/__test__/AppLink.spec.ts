import { mount, VueWrapper } from '@vue/test-utils'
import AppLink from '../AppLink.vue'
import { router } from '../../router'
import { ComponentPublicInstance } from 'vue'

describe('AppLink', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  function createComponent(props: any) {
    wrapper = mount(AppLink, {
      props,
      global: {
        plugins: [router],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  test('link without params', () => {
    createComponent({ name: 'global-feed' })

    expect(wrapper.find('[href="#/"]')).toBeTruthy()
  })

  test('link with params', () => {
    createComponent({
      name: 'profile',
      params: {
        username: 'jason',
      },
    })

    expect(wrapper.find('[href="#/@jason"]')).toBeTruthy()
  })
})
