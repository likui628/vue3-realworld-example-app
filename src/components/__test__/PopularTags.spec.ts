import { flushPromises, mount } from '@vue/test-utils'
import PopularTags from '../PopularTags.vue'
import asyncComponentWrapper from '../../utils/async-component-wrapper'
import { router } from '../../router'

const mockTags = { tags: ['tag1', 'tag2', 'tag3'] }
jest.mock('../../utils/request', () =>
  jest.fn().mockImplementation(() => {
    return { get: () => Promise.resolve(mockTags) }
  })
)

describe('PopularTags.vue', () => {
  it('there are three tags', async () => {
    const wrapper = mount(asyncComponentWrapper(PopularTags), {
      global: {
        plugins: [router],
      },
    })
    await flushPromises()
    expect(wrapper.findAll('a')).toHaveLength(3)
  })
})
