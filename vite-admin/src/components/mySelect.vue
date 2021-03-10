<template>
  <el-select
    v-model="value"
    placeholder="请选择"
    @change="handleSelect"
    clearable
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'mySelect',
  emits: ['receiveSelected'],
  setup(props, { emit }) {
    let value = ref(0);
    let options = reactive([
      {
        value: '0',
        label: '否',
      },
      {
        value: '1',
        label: '是',
      },
    ]);
    function handleSelect(val: number) {
      emit('receiveSelected', val);
    }
    return {
      options,
      value,
      handleSelect,
    };
  },
});
</script>

<style scoped></style>
