<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="actionURL"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceeded"
    multiple
    :auto-upload="false"
    :limit="5"
    list-type="picture"
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
import { useGlobSetting } from '@/hooks/setting';
const globSetting = useGlobSetting();

export default defineComponent({
  name: 'manualUpload',
  emits: ['receiveFileUrl'],
  setup(props, { emit }) {
    const upload = ref();
    const fileList = reactive([]);
    const { createErrorMessage, createSuccessMessage } = useMessage();
    const actionURL = globSetting.apiUrl+globSetting.urlPrefix+'/upload'
    function submitUpload() {
      upload.value.submit();
    }
    function handleSuccess(res: any, file) {
      createSuccessMessage('上传成功');
      emit('receiveFileUrl', {
        url: res.file_url,
        uploadState: ETag.success,
        tempUrl:window.URL.createObjectURL(file.raw)
      });
    }
    function handleError(file: any) {
      createErrorMessage(`${file.name}上传失败`);
    }
    function handleExceeded() {
      createErrorMessage('最多同时上传五张图片!')
    }
    return {
      submitUpload,
      fileList,
      upload,
      handleSuccess,
      handleError,
      handleExceeded,
      actionURL
    };
  },
});
</script>

<style scoped></style>
