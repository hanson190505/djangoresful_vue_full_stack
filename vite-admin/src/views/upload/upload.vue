<template>
  <div>
    <h1>Upload</h1>
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:8000/api/v1/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <img :src="imageUrl" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useGlobSetting } from '@/hooks/setting/index';

export default defineComponent({
  setup() {
    const env = useGlobSetting();
    const uploadURL = ref(env.apiUrl + env.urlPrefix + env.uploadUrl);
    const fileList = reactive([]);
    const imageUrl = ref('')
    const handlePreview = (file, fileList) => {
      console.log(file, fileList);
    };
    const handleRemove = (file) => {
      console.log(file);
    };
    const handleExceed = (files, fileList) => {};
    const beforeUpload = (file)=>{
      imageUrl.value =  window.URL.createObjectURL(file)
    }
    return {
      handlePreview,
      handleRemove,
      handleExceed,
      fileList,
      uploadURL,
      imageUrl,
      beforeUpload
    };
  },
});
</script>

<style scoped></style>
