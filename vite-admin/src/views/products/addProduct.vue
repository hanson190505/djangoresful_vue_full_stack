<template>
  <div>
    <el-form :model="formData">
      <el-form-item label="产品名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="产品标号">
        <el-input v-model="formData.number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IProduct } from './models';
import { postProduct } from './product';

export default defineComponent({
  name: 'addProduct',
  setup() {
    //TODO:点击其他tab之后表单数据丢失,需要缓存才能保留?
    const formData = <IProduct>reactive({});
    function submit() {
      postProduct(formData);
    }
    return {
      submit,
      formData,
    };
  },
});
</script>

<style scoped></style>
