<template>
  <ul>
    <h4>Note:</h4>
    <li><small>如没有父级目录,请留空</small></li>
  </ul>
  <el-form
    :model="categoryForm"
    ref="categoryRef"
    label-width="80px"
    :inline="true"
  >
    <el-form-item label="父级目录">
      <product-category @receivePid="receivePid"></product-category>
    </el-form-item>
    <el-form-item label="目录">
      <el-input v-model="categoryForm.name" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">{{
        loading ? '创建中...' : '立即创建'
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import productCategory from './productCategory.vue';
import { defineComponent, reactive, ref } from 'vue';
import { defHttp } from '@/utils/http/axios';
import { EApiPath } from '@/api/api';
import { useMessage } from '@/hooks/web/useMessage';
//TODO:更改目录
export default defineComponent({
  components: { productCategory },
  name: 'categories',
  setup() {
    const { createErrorMessage, createSuccessMessage } = useMessage();
    let categoryForm = reactive({
      name: '',
    });
    let submitLoading = ref(false);
    let loading = ref(false);
    function receivePid(pid: number) {
      if (typeof pid === 'number') {
        categoryForm.pid = pid;
      }
    }
    function onSubmit() {
      submitLoading.value = true;
      defHttp
        .post({
          url: EApiPath.CATEGORY,
          data: categoryForm,
        })
        .then(() => {
          createSuccessMessage('创建成功');
          submitLoading.value = false;
        })
        .catch((err) => {
          createErrorMessage('创建失败!!');
        });
    }
    return {
      categoryForm,
      onSubmit,
      receivePid,
      submitLoading,
      loading,
    };
  },
});
</script>

<style scoped></style>
