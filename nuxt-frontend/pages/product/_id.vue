<template>
  <div>
    <h1>id</h1>
    {{ p }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  layout() {
    return "child";
  },
  async asyncData(context) {
    const id = context.params.id;
    try {
      const post = await context.app.$axios.$get(`/product/${id}`);
      let p = JSON.stringify(post);
      return { p };
    } catch (e) {
      context.error(e);
    }
  }
});
</script>
