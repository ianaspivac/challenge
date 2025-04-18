import { createStore } from "vuex"
import { mount } from "@vue/test-utils"
import TodoView from "@/views/TodoView.vue"
import todosModule from "@/store/modules/todos"

describe("TodoView.vue", () => {
  it("renders todos from store", () => {
    const store = createStore({
      modules: {
        todos: {
          ...todosModule,
          state: () => ({
            ...todosModule.state(),
            todos: [{ id: 1, title: "Test todo", name: "Alice" , completed: true }]
          })
        }
      }
    })

    const wrapper = mount(TodoView, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.text()).toContain("Test todo")
  })
})
