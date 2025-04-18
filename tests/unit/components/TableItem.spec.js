import { mount } from "@vue/test-utils"
import TableItem from "@/components/TableItem.vue"

describe("TableItem.vue", () => {
  const item = {
    id: 1,
    name: "Ann",
    title: "Go test",
    completed: true,
  }

  it("renders item fields", () => {
    const wrapper = mount(TableItem, {
      props: { data: item },
    })

    expect(wrapper.text()).toContain(item.name)
    expect(wrapper.text()).toContain(item.title)
    expect(wrapper.find("input[type='checkbox']").element.checked).toBe(true)
  })
})
