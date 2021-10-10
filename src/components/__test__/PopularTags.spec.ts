import { flushPromises, mount } from '@vue/test-utils'
import PopularTags from '../PopularTags.vue'
import asyncComponentWrapper from '../../utils/async-component-wrapper'
import { router } from '../../router'
import { useTags } from '../../composable/useTags'
import { ref } from 'vue'

jest.mock('src/composable/useTags')
const mockUseTags = useTags as jest.MockedFunction<typeof useTags>

const mockValue = async (tags: Array<string>) => {
  mockUseTags.mockReturnValueOnce({
    tags: ref([...tags]),
    fetchTags: jest.fn(),
  })
  await router.push('/')
}

describe('PopularTags.vue', () => {
  test('no tag there', async () => {
    await mockValue([])
    const wrapper = mount(asyncComponentWrapper(PopularTags), {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()
    expect(wrapper.html()).toContain('No tags are here... yet.')
  })

  test('there are three tags', async () => {
    await mockValue(['foo', 'bar', 'foobar'])
    const wrapper = mount(asyncComponentWrapper(PopularTags), {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()
    expect(wrapper.findAll('a')).toHaveLength(3)
  })
})
