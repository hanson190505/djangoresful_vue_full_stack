<template>
  <div>
    <el-form :model="formData" label-width="100px" v-loading="loading">
      <el-form-item label="产品名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="产品标号">
        <el-input v-model="formData.number"></el-input>
      </el-form-item>
      <el-form-item
        :label="'image' + index"
        v-for="(image, index) in formData.image"
        :key="index"
      >
        属性:<el-input v-model="image.attr"></el-input> 地址:<el-input
          v-model="image.addr"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :disabled="submitDisabled"
          >提交</el-button
        >
        <el-button type="primary" @click="addImage">新增图片</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IProduct } from './models';
import { postProduct } from './product';
import { useMessage } from '@/hooks/web/useMessage';

export default defineComponent({
  name: 'addProduct',
  setup() {
    const { createSuccessMessage, createErrorMessage } = useMessage();
    let loading = ref(false);
    let submitDisabled = ref(false);
    const formData = <IProduct>reactive({
      image: [],
    });
    const tmpImageData = reactive([
      {
        attr: 'image1',
        addr: 'sdffffffffffffffffffffffwerwer',
      },
      {
        attr: 'imag2',
        addr: '2weruowiuhklsjfhosd89f7927324h',
      },
    ]);
    function submit() {
      loading.value = true;
      postProduct(formData)
        .then((res) => {
          loading.value = false;
          submitDisabled.value = true;
          createSuccessMessage('提交成功');
        })
        .catch((err) => {
          createErrorMessage('提交失败');
        });
    }
    const addImage = () => {
      formData.image.push({
        attr: '',
        addr: '',
      });
    };
    return {
      submit,
      formData,
      tmpImageData,
      addImage,
      loading,
      submitDisabled,
    };
  },
});
</script>

<style scoped></style>
