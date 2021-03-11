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
  props: {
    options: {
      type: String,
    },
  },
  setup(props, { emit }) {
    let value = ref(0);
    let options = reactive([]);
    let imageOwnerOptions = reactive([
      {
        value: 'cover',
        label: 'cover',
      },
      {
        value: 'banner',
        label: 'banner',
      },
      {
        value: 'detail',
        label: 'detail',
      },
      {
        value: 'home-banner',
        label: 'home-banner',
      },
    ]);
    let YNoptions = reactive([
      {
        value: '0',
        label: '否',
      },
      {
        value: '1',
        label: '是',
      },
    ]);
    switch (props.options) {
      case 'imageOwnerOptions':
        options.push(...imageOwnerOptions);
        break;
      case 'YNoptions':
        options.push(...YNoptions);
        break;
      default:
        break;
    }
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
