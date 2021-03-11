<template>
  <el-cascader
    :options="options"
    :props="props"
    clearable
    @change="handleChange"
  ></el-cascader>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'multipleSelect',
  emits: ['receiveSelected'],
  props: {
    optType: {
      type: String,
    },
  },
  setup(data, { emit }) {
    const props = reactive({
      multiple: true,
    });
    let options = reactive([]);
    let materialOptions = reactive([
      {
        value: 'aluminium',
        label: 'aluminium',
      },
      {
        value: 'wood',
        label: 'wood',
      },
    ]);
    switch (data.optType) {
      case 'materialOptions':
        options.push(...materialOptions);
        break;
      default:
        break;
    }
    function handleChange(params: string[]) {
      emit('receiveSelected', params);
    }
    return {
      props,
      options,
      handleChange,
    };
  },
});
</script>

<style scoped></style>
