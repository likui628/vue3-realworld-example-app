import { mount } from '@vue/test-utils'
import AppLink from '../AppLink.vue'
import { router } from '../../router'

describe('AppLink', () => {
  test('link without params', () => {
    const wrapper = mount(AppLink, {
      props: {
        name: 'global-feed',
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('[href="#/"]')).toBeTruthy()
  })

  test('link with params', () => {
    const wrapper = mount(AppLink, {
      props: {
        name: 'profile',
        params: {
          username: 'jason',
        },
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('[href="#/@jason"]')).toBeTruthy()
  })
})
