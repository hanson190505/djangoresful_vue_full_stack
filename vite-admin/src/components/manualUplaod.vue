<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://127.0.0.1:8000/api/v1/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
    :on-change="onChange"
    :file-list="fileList"
    multiple
    :auto-upload="true"
    :limit="5"
  >
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <template #tip>
      <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ETag } from '@/components/types';
import { useMessage } from '@/hooks/web/useMessage';

export default defineComponent({
  name: 'manualUpload',
  emits: ['receiveFileUrl'],
  setup(props, { emit }) {
    const upload = ref();
    const fileList = reactive([]);
    const { createErrorMessage, createSuccessMessage } = useMessage();
    function submitUpload() {
      upload.value.submit();
    }
    function handlePreview() {}
    function handleRemove() {}
    function beforeUpload(file: any) {
      // console.log(file);
    }
    function onChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);
    }
    function handleSuccess(res: any, file) {
      // console.log(res);
      createSuccessMessage('上传成功');
      emit('receiveFileUrl', {
        url: res.file_url,
        uploadState: ETag.success,
      });
    }
    function handleError(file: any) {
      createErrorMessage(`${file.name}上传失败`);
    }
    return {
      submitUpload,
      handlePreview,
      handleRemove,
      fileList,
      upload,
      handleSuccess,
      handleError,
      beforeUpload,
      onChange,
    };
  },
});
</script>

<style scoped></style>
