<template>
  <div>
    <el-form
      :model="formData"
      label-width="100px"
      v-loading="loading"
      :rules="rules"
    >
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="产品类型">
            <el-input v-model="formData.category"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品编号" placeholder="自动生成">
            <el-input v-model="formData.number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="8" autocomplete="on">
          <el-form-item label="产品标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="产品描述">
            <el-input v-model="formData.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="新品">
            <my-select
              v-model="formData.is_new"
              @receiveSelected="receiveIsNewSelected"
            ></my-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="热销">
            <my-select
              v-model="formData.is_hot"
              @receiveSelected="receiveIsHotSelected"
            ></my-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商">
            <el-input v-model="formData.provider"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品牌">
            <el-input v-model="formData.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="库存">
            <el-input v-model="formData.stock" placeholder="默认999"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

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
      <upload-image></upload-image>
      <my-upload></my-upload>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IProduct } from './models';
import { postProduct } from './product';
import { useMessage } from '@/hooks/web/useMessage';
import mySelect from '@/components/mySelect.vue';
import UploadImage from '@/components/uploadImage.vue';
import MyUpload from '@/components/myUpload.vue';

export default defineComponent({
  components: { mySelect, UploadImage, MyUpload },
  name: 'addProduct',
  setup() {
    const { createSuccessMessage, createErrorMessage } = useMessage();
    let loading = ref(false);
    let submitDisabled = ref(false);
    const formData = <IProduct>reactive({
      image: [],
    });
    const rules = {
      name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
    };
    function receiveIsNewSelected(params: number) {
      formData.is_new = params;
    }
    function receiveIsHotSelected(params: number) {
      formData.is_hot = params;
    }
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
      console.log(formData);
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
      receiveIsNewSelected,
      receiveIsHotSelected,
      rules,
    };
  },
});
</script>

<style scoped></style>
