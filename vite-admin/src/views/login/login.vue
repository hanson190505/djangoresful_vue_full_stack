<template>
  <el-form :model="formData">
    <el-form-item label="用户名">
      <el-input type="text" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="handleRegister">注册</el-button>
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button type="info" @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ILoginUser } from './login';
import router from '@/router';
import { defHttp } from '@/utils/http/axios';
import { useStorage } from '@/hooks/cach/storage';
import { useStore } from 'vuex';
import { EApiPath } from '@/api/api';
import { useMessage } from '@/hooks/web/useMessage';

export default defineComponent({
  name: 'login',
  setup() {
    const { currentRoute } = router;
    const formData = <ILoginUser>reactive({
      username: '',
      password: '',
    });
    const { setToken } = useStorage();
    const store = useStore();
    const { createSuccessMessage, createErrorMessage } = useMessage();
    // async function login() {
    //   await store;
    //   const { redirect } = currentRoute.value.query;
    //   router.replace({
    //     path: (redirect as string) || '/',
    //   });
    // }
    //TODO:实现注册表单
    function handleRegister() {
      defHttp
        .post({
          url: EApiPath.REGISTER,
          data: {
            username: formData.username,
            password: formData.password,
          },
        })
        .then((res) => {
          createSuccessMessage('注册成功');
        })
        .catch((err) => {
          createErrorMessage('注册失败');
        });
    }
    async function handleLogin() {
      await store.dispatch('user/login', formData);
      const { redirect } = currentRoute.value.query;
      router.replace({
        path: (redirect as string) || '/',
      });
    }
    function handleReset() {}
    return {
      onchange,
      formData,
      handleRegister,
      handleLogin,
      handleReset,
    };
  },
});
</script>

<style scoped></style>
