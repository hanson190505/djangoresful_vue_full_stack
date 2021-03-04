<template>
  <div>
    <h1>Upload</h1>
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:8000/api/v1/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const env = import.meta.env;
    const fileList = reactive([]);
    const handlePreview = (file, fileList) => {
      console.log(file, fileList);
    };
    const handleRemove = (file) => {
      console.log(file);
    };
    const handleExceed = (files, fileList) => {
      console.log('hanson');
    };
    return {
      handlePreview,
      handleRemove,
      handleExceed,
      fileList,
    };
  },
});
</script>

<style scoped></style>
