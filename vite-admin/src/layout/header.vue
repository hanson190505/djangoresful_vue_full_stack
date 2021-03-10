<template>
  <div class="menu-header">
    <el-row :gutter="0">
      <el-col :span="6">
        <el-tooltip class="item" effect="dark" content="刷新" placement="right">
          <el-button
            type="primary"
            @click="reloadRouteView"
            icon="el-icon-refresh"
            >刷新</el-button
          >
        </el-tooltip>
        <el-button type="primary" @click="clearTabs" icon="el-icon-delete"
          >清空</el-button
        >
      </el-col>
      <el-col :span="6"> </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button type="primary" @click="logout" icon="el-icon-switch-button"
          >退出</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useStorage } from '@/hooks/cach/storage';
import { removeEditTab, removeTabs } from './layout';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const { removeToken } = useStorage();

export default defineComponent({
  name: 'menuHeader',

  setup(props, { emit }) {
    const reloadRouteView = inject('changeRouteActive');
    const clearTabs = inject('clearTabs');
    const route = useRouter();
    const store = useStore();
    const { currentRoute } = route;
    const { redirect } = currentRoute.value.query;
    const logout = () => {
      removeToken();
      removeTabs();
      removeEditTab();
      store.state.user.token = {};
      route.replace({
        path: (redirect as string) || 'login',
      });
    };
    return {
      reloadRouteView,
      clearTabs,
      logout,
    };
  },
});
</script>

<style scoped>
.menu-header {
  margin-top: 10px;
}
</style>
