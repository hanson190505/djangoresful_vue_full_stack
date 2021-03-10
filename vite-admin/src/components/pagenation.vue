<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let total = ref(0);
    const handleCurrentChange = (val: string) => {
      console.log(val);
    };
    const prevClick = (val: string) => {
      console.log(val);
    };
    const nextClick = (val: string) => {
      console.log(val);
    };
    return {
      handleCurrentChange,
      prevClick,
      nextClick,
      total,
    };
  },
});
</script>

<style scoped></style>
