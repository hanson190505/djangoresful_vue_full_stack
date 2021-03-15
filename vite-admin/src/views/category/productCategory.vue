<template>
  <el-cascader
    :options="options.data"
    :props="{ checkStrictly: true, value: 'id', label: 'name' }"
    clearable
    v-model="category"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  >
    <template #default="{ node, data }">
      <span>{{ data.name }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>
</template>

<script lang="ts">
import { EApiPath } from '@/api/api';
import { defHttp } from '@/utils/http/axios';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { transformCategory } from './util';

export default defineComponent({
  name: 'productCategory',
  emits: ['receivePid'],
  setup(props, { emit }) {
    let options = reactive({
      data: [],
    });
    let category = ref();
    async function getCategory() {
      let _data = await defHttp.get({
        url: EApiPath.CATEGORY,
      });
      options.data = transformCategory(_data);
    }
    function handleChange(val) {
      if (val) {
        emit('receivePid', (category.value = val[val.length - 1]));
      }
    }
    function handleVisibleChange(params: boolean) {
      if (params) {
        getCategory();
      } else {
      }
    }
    onMounted(() => {});
    return {
      options,
      category,
      handleChange,
      handleVisibleChange,
    };
  },
});
</script>

<style scoped></style>
