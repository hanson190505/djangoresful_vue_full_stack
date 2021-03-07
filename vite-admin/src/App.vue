<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BasicLayout from '@/components/basicLayout/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    BasicLayout,
  },
  setup() {},
});
</script>

<style></style>
