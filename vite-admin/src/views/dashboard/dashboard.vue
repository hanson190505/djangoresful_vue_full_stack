<template>
  <div>
    <h1>Dashboard</h1>
    <el-button type="primary" @click="open">测试消息提示</el-button>
  </div>
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
