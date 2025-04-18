<template>
  <div class="filter-container" v-if="users">
    <h2 class="title">Filters</h2>

    <div class="filters">
      <div class="filter-input">
        <label for="user">User</label>

        <select
          id="user"
          v-model="userId"
          @change="updateFilter('userId', userId)"
        >
          <option :value="null">All users</option>
          <option v-for="user in users" :value="user.id" :key="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="filter-input">
        <label for="completed">Completed</label>
        <input
          id="completed"
          type="checkbox"
          v-model="completed"
          @change="updateFilter('completed', completed)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  name: "TodosFilter",

  data() {
    return {
      completed: false,
      userId: null,
    }
  },

  computed: {
    ...mapState("todos", {
      users: (state) => state.users,
    }),
  },

  methods: {
    ...mapMutations("todos", ["setFilter"]),
    ...mapActions("todos", ["loadTodos"]),

    updateFilter(key, value) {
      this.setFilter({ key: key, value: value })
      this.loadTodos()
    },
  },
}
</script>

<style scoped lang="scss">
.filter-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.filters {
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;

  .title {
    font-weight: 600;
    display: block;
  }

  .filter-input {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }

    select,
    input[type="checkbox"] {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      outline: none;

      &:focus {
        border-color: #2f458f;
      }

      &.checkbox {
        width: 20px;
        height: 20px;
      }
    }

    select {
      background-color: #fff;
      cursor: pointer;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }
  }
}
</style>
