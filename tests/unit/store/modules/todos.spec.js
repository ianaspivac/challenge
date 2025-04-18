import module from "@/store/modules/todos"
import { fetchUsers, fetchTodos } from "@/api/todos"

jest.mock("@/api/todos", () => ({
  fetchUsers: jest.fn(),
  fetchTodos: jest.fn(),
}))

describe("Vuex Todos Module", () => {
  let state

  beforeEach(() => {
    state = module.state()
  })

  describe("mutations", () => {
    it("sets users", () => {
      const users = [{ id: 1, name: "Ann" }]
      module.mutations.setUsers(state, users)
      expect(state.users).toEqual(users)
    })

    it("sets todos", () => {
      const todos = [{ id: 1, title: "Test todo", userId: 1, completed: false }]
      module.mutations.setTodos(state, todos)
      expect(state.todos).toEqual(todos)
    })

    it("sets loading", () => {
      module.mutations.setLoading(state, true)
      expect(state.loading).toBe(true)
    })

    it("sets a filter", () => {
      module.mutations.setFilter(state, { key: "completed", value: true })
      expect(state.filters.completed).toBe(true)
    })
  })

  describe("getters", () => {
    it("returns users", () => {
      state.users = [{ id: 2, name: "Tom" }]
      const result = module.getters.users(state)
      expect(result).toEqual(state.users)
    })

    it("returns todos", () => {
      state.todos = [
        { id: 3, title: "Go jogging", userId: 2, completed: false },
      ]
      const result = module.getters.todos(state)
      expect(result).toEqual(state.todos)
    })
  })

  describe("actions", () => {
    it("loadUsers commits users and loading", async () => {
      const commit = jest.fn()
      const users = [{ id: 1, name: "Ann" }]
      fetchUsers.mockResolvedValue({ data: users })

      await module.actions.loadUsers({ commit })

      expect(commit).toHaveBeenCalledWith("setLoading", true)
      expect(commit).toHaveBeenCalledWith("setUsers", users)
      expect(commit).toHaveBeenCalledWith("setLoading", false)
    })

    it("loadTodos applies filters and commits todos", async () => {
      const commit = jest.fn()
      const todos = [{ id: 1, title: "Test", userId: 1, completed: true }]
      fetchTodos.mockResolvedValue({ data: todos })

      const stateWithFilters = {
        filters: {
          userId: null,
          completed: true,
        },
      }

      await module.actions.loadTodos({ commit, state: stateWithFilters })

      expect(fetchTodos).toHaveBeenCalledWith({ completed: true })
      expect(commit).toHaveBeenCalledWith("setTodos", todos)
    })
  })
})
