<template>
  <el-select
    v-model="provider"
    placeholder="请选择"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  >
    <el-option
      v-for="item in providers.data"
      :key="item.id"
      :label="item.short_name"
      :value="item.id"
    >
      <!-- <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{
        item.value
      }}</span> -->
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { EApiPath } from '@/api/api';
import { defHttp } from '@/utils/http/axios';
import { defineComponent, reactive, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'providerSelect',
  emits: ['receiveProviderId'],
  setup(propsm, { emit }) {
    let providers = reactive({
      data: [
        {
          id: 0,
          short_name: 'default',
        },
      ],
    });
    let provider = ref();
    async function getProvider() {
      providers.data = await defHttp.get({
        url: EApiPath.PROVIDER,
      });
    }
    function handleChange(id: number) {
      emit('receiveProviderId', id);
    }
    function handleVisibleChange(params: boolean) {
      if (params) {
        getProvider();
      } else {
      }
    }
    return {
      providers,
      provider,
      handleChange,
      handleVisibleChange,
    };
  },
});
</script>

<style scoped></style>
