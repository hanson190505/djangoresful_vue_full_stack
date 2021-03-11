<template>
  <input type="text" class="json-input" />
  <button @click="jsonBtnClick" class="json-btn-add">
    <span>+</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';

export default defineComponent({
  name: 'dashBoard',
  setup() {
    const { createSuccessMessage } = useMessage();

    const open = () => {
      createSuccessMessage('successfully');
    };
    return {
      open,
    };
  },
});
</script>

<style>
.json-input {
  border: none;
  outline: none;
  border-bottom: 2px solid black;
}
.json-btn-add {
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
