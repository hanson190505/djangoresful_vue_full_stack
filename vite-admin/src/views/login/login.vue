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
  <el-button @click="onchange">前进</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ILoginUser } from '@/hooks/user/login';
import router from '@/router';
import { useStore } from 'vuex';
import { key } from '@/store';
import { defHttp } from '@/utils/http/axios';

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore(key);
    const formData = <ILoginUser>reactive({
      username: '',
      password: '',
    });
    async function login(data: ILoginUser) {
      const token = await defHttp.post({
        url: '/token/',
        data: data,
      });
      if (token) {
        await router.push({
          name: 'Root',
        });
        store.state.token = token;
      }
    }
    function handleRegister() {}
    function handleLogin() {
      login(formData);
    }
    function handleReset() {
      console.log(store.state.token);
    }
    function onchange() {
      router.push('/');
    }
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
