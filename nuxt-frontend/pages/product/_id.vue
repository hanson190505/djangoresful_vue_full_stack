<template>
  <div>
    <h1>id</h1>
    {{ post }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData(context) {
    const id = context.params.id;
    try {
      const post = await context.app.$axios.$get(
        `http://127.0.0.1:8000/api/v1/product/${id}`
      );

      return { post };
    } catch (e) {
      context.error(e);
    }
  }
});
</script>
