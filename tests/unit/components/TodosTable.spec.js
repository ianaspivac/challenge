import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import TodosTable from "@/components/TodosTable.vue"
import TableItem from "@/components/TableItem.vue"
import todosModule from "@/store/modules/todos"
import { fetchTodos, fetchUsers } from "@/api/todos"

jest.mock("@/api/todos", () => ({
  fetchTodos: jest.fn(),
  fetchUsers: jest.fn()
}))

describe("TodosTable.vue", () => {
  it("renders TableItem components for each todo", async () => {
    const mockTodos = [
      { id: 1, title: "Go tests", completed: false, userId: 1 },
      { id: 2, title: "Go jogging", completed: true, userId: 2 },
    ]

    const mockUsers = [
      { id: 1, name: "Ann" },
      { id: 2, name: "Tom" },
    ]

    fetchTodos.mockResolvedValueOnce({
      data: mockTodos,
    })

    fetchUsers.mockResolvedValueOnce({
      data: mockUsers,
    })

    const store = createStore({
      modules: {
        todos: {
          ...todosModule,
          namespaced: true,
        },
      },
    })

    const wrapper = mount(TodosTable, {
      global: {
        plugins: [store],
      },
    })

    await store.dispatch("todos/loadUsers")
    await store.dispatch("todos/loadTodos")
    await new Promise(resolve => setTimeout(resolve))
    await wrapper.vm.$nextTick()

    const items = wrapper.findAllComponents(TableItem)
    expect(items).toHaveLength(2)

    items.forEach((itemWrapper, index) => {
      const todo = mockTodos[index]
      const user = mockUsers.find(user => user.id === todo.userId)

      expect(itemWrapper.text()).toContain(todo.title)
      expect(itemWrapper.text()).toContain(user.name)
    })
  })
})
