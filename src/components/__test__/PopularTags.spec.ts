import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import PopularTags from '../PopularTags.vue'
import asyncComponentWrapper from '../../utils/test/async-component-wrapper'
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
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(asyncComponentWrapper(PopularTags), {
      global: {
        plugins: [router],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  test('no tag there', async () => {
    await mockValue([])

    createComponent()

    await flushPromises()
    expect(wrapper.html()).toContain('No tags are here... yet.')
  })

  test('there are three tags', async () => {
    await mockValue(['foo', 'bar', 'foobar'])

    createComponent()

    await flushPromises()
    expect(wrapper.findAll('a')).toHaveLength(3)
  })
})
