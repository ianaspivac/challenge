import { mount } from "@vue/test-utils"
import TodosFilter from "@/components/TodosFilter.vue"
import { createStore } from "vuex"
import todosModule from "@/store/modules/todos"
import { fetchUsers, fetchTodos } from "@/api/todos"

jest.mock("@/api/todos", () => ({
  fetchUsers: jest.fn(),
  fetchTodos: jest.fn(),
}))

describe("TodosFilter.vue", () => {
  it("renders user select and checkbox, allows interaction", async () => {
    fetchTodos.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Go tests", completed: false, userId: 1 },
        { id: 2, title: "Go jogging", completed: true, userId: 2 },
      ],
    })

    fetchUsers.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Ann" },
        { id: 2, name: "Tom" },
      ],
    })

    const store = createStore({
      modules: {
        todos: {
          ...todosModule,
          namespaced: true,
        },
      },
    })

    await store.dispatch("todos/loadUsers")
    await store.dispatch("todos/loadTodos")
    await new Promise(resolve => setTimeout(resolve))

    const wrapper = mount(TodosFilter, {
      global: {
        plugins: [store],
      },
    })

    await wrapper.vm.$nextTick()

    const select = wrapper.find("select")
    const checkbox = wrapper.find('input[type="checkbox"]')

    expect(select.exists()).toBe(true)
    expect(select.findAll("option")).toHaveLength(3)

    expect(checkbox.exists()).toBe(true)
  })
})
