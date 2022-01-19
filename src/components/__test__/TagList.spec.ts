import { mount } from '@vue/test-utils'
import TagList from '../TagList.vue'

describe('TagList', () => {
  it('should render tags', async () => {
    const wrapper = mount(TagList, {
      props: {
        tags: ['1', '2', '3'],
      },
    })

    expect(wrapper.findAll('.ion-close-round')).toHaveLength(0)
    expect(wrapper.findAll('.tag-default')).toHaveLength(3)

    await wrapper.setProps({ editable: true })

    expect(wrapper.findAll('.ion-close-round')).toHaveLength(3)
  })

  test('click tag ', async () => {
    const wrapper = mount(TagList, {
      props: {
        tags: ['1'],
      },
    })
    wrapper.find('.tag-default').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click[0]).toEqual(['1'])
  })
})
