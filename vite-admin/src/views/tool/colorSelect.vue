<template>
  <el-cascader
    :options="colorSelectData"
    :props="{ multiple: true, checkStrictly: true }"
    clearable
    :show-all-levels="false"
    filterable
    @visible-change="handleVisibleChange"
    @change="handleChange"
    v-model="selectedColor"
  >
    <template #default="{ node, data }">
      <span :style="{ backgroundColor: data.web }">{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>
</template>

<script lang="ts">
export interface IColorSelect {
  value: string;
  label: string;
  children: IColorSelect[];
}

import { EApiPath } from '@/api/api';
import { defHttp } from '@/utils/http/axios';
import { defineComponent, reactive, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'colorSelect',
  emits: ['receiveColor'],
  setup(props, { emit }) {
    let colorData = reactive({
      results: [],
    });
    let colorSelectData = <IColorSelect[]>reactive([{}]);
    let selectedColor = ref();
    async function getColorData() {
      colorData = await defHttp.get({
        url: EApiPath.TOOLS,
      });
      // console.log(colorData);
      colorSelectData[0] = colorData.results[0].more;
    }
    function getStyle(web: string) {
      console.log(web);
    }
    function handleVisibleChange(params: boolean) {
      if (params) {
        getColorData();
      }
    }
    function handleChange(data: string) {
      emit('receiveColor', data);
    }
    onMounted(() => {});
    return {
      colorSelectData,
      getStyle,
      selectedColor,
      handleVisibleChange,
      handleChange,
    };
  },
});
</script>

<style scoped></style>
