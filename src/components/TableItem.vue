<template>
  <td v-for="field in fields" :key="field">
    <template v-if="field === 'completed'">
      <input type="checkbox" :checked="data.completed" disabled />
    </template>

    <template v-else>
      {{ data[field] }}
    </template>
  </td>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    data: Object,
  },

  data() {
    return {
      fields: ["id", "title", "completed", "username"],
    }
  },
}
</script>
