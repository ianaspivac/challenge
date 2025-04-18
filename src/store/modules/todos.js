import { fetchUsers, fetchTodos } from "@/api/todos"

export default {
  namespaced: true,

  state: () => ({
    users: [],
    todos: [],
    loading: false,
    filters: {
      userId: null,
      completed: null,
    },
  }),

  mutations: {
    setUsers(state, users) {
      state.users = users
    },

    setTodos(state, todos) {
      state.todos = todos
    },

    setLoading(state, loading) {
      state.loading = loading
    },

    setFilter(state, { key, value }) {
      state.filters[key] = value
    },
  },

  actions: {
    async loadUsers({ commit }) {
      commit("setLoading", true)
      try {
        const response = await fetchUsers()
        commit("setUsers", response.data)
      } finally {
        commit("setLoading", false)
      }
    },

    async loadTodos({ commit, state }) {
      const filters = { ...state.filters }

      Object.keys(filters).forEach((key) => {
        if (filters[key] == null || filters[key] === "") delete filters[key]
      })

      commit("setLoading", true)
      try {
        const response = await fetchTodos(filters)
        commit("setTodos", response.data)
      } finally {
        commit("setLoading", false)
      }
    },
  },

  getters: {
    users(state) {
      return state.users
    },
    todos(state) {
      return state.todos
    },
  },
}
