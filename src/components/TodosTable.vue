<template>
  <table class="table" v-if="todos && users && modifiedTodos">
    <thead>
      <tr>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="todoData in modifiedTodos" :key="todoData.id">
        <table-item :data="todoData" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import TableItem from "@/components/TableItem.vue"
import { mapState } from "vuex"

export default {
  name: "TodosTables",

  components: {
    TableItem,
  },

  data() {
    return {
      fields: ["ID", "Title", "Completed", "Name"],
    }
  },

  computed: {
    ...mapState("todos", {
      users: (state) => state.users,
      todos: (state) => state.todos,
    }),

    modifiedTodos() {
      return this.todos.map((todo) => {
        const user = this.users.find((user) => user.id === todo.userId)

        return {
          ...todo,
          username: user.name,
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  background-color: #f9f9f9;
  margin-left: auto;
  margin-right: auto;

  th,
  td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #4c6baf;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  input[type="checkbox"] {
    pointer-events: none;
    cursor: not-allowed;
  }

  td {
    text-align: center;
  }
}
</style>
