<template>
  <div class="todo">
    <todos-filter />
    <todos-table />
  </div>
</template>

<script>
import TodosTable from "@/components/TodosTable.vue"
import TodosFilter from "@/components/TodosFilter.vue"
import { mapActions } from "vuex"

export default {
  name: "ToDoView",

  components: {
    TodosFilter,
    TodosTable,
  },

  mounted() {
    this.loadUsers()
    this.loadTodos()
  },

  methods: {
    ...mapActions("todos", ["loadTodos", "loadUsers"]),
  },
}
</script>
