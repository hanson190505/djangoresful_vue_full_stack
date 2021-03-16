<template>
  <div>color-select</div>
  <span class="demonstration">多选选择任意一级选项</span>
  <el-cascader
    :options="colorSelectData"
    :props="{ multiple: true, checkStrictly: true }"
    clearable
  ></el-cascader>
</template>

<script lang="ts">
export interface IColorSelect {
  value: string;
  label: string;
  children: IColorSelect[];
}

import { EApiPath } from '@/api/api';
import { defHttp } from '@/utils/http/axios';
import { defineComponent, reactive, onMounted } from 'vue';

export default defineComponent({
  name: 'colorSelect',
  setup() {
    let colorData = reactive({
      results: [],
    });
    let colorSelectData = <IColorSelect[]>reactive([{}]);
    async function getColorData() {
      colorData = await defHttp.get({
        url: EApiPath.TOOLS,
      });
      // console.log(colorData);
      colorSelectData[0].children = colorData.results[0].more.children;
    }

    onMounted(() => {
      getColorData();
    });
    return {
      colorSelectData,
    };
  },
});
</script>

<style scoped></style>
