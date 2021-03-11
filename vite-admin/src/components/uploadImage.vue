<template>
  <div>
    <el-upload
      action="http://127.0.0.1:8000/api/v1/upload"
      list-type="picture-card"
      :auto-upload="true"
      :on-success="handleUploadSuccess"
    >
      <template #default>
        <i class="el-icon-plus"></i>
      </template>
      <template #file="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img width="auto" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'uploadImage',
  setup(props, { emit }) {
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    const disabled = ref(false);
    const loading = ref(false);
    function handleRemove(file) {
      console.log(file);
    }
    function handlePictureCardPreview(file) {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
    }
    function handleDownload(file) {
      console.log(file);
    }
    function handleUploadSuccess(res, file, fileList) {
      loading.value = true;
      if (res) {
        loading.value = false;
      }
    }
    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      handleUploadSuccess,
      loading,
    };
  },
});
</script>

<style scoped></style>
