import axios from "axios"

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
})

export function fetchUsers() {
  return api.get("users")
}

export function fetchTodos(params) {
  return api.get("todos", { params })
}
