<template>
  <el-container>
    <el-aside width="200px">
      <side-menu @addTab="addTab"> </side-menu>
    </el-aside>
    <el-container>
      <el-header :style="headerStyle">
        <menu-header></menu-header>
      </el-header>
      <el-main>
        <el-tabs
          v-model="editTabValue"
          type="card"
          closable
          @tab-click="tabClick"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in panes.tabs"
            :key="item.name"
            :label="item.meta.title"
            :name="item.name"
          >
            <!-- {{ item.name }} -->
          </el-tab-pane>
        </el-tabs>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  nextTick,
  provide,
  onMounted,
} from 'vue';
import SideMenu from './sideMenu.vue';
import menuHeader from './header.vue';
import { menuStyle } from '@/style';
import { useRouter } from 'vue-router';
import { IAppRouteRecordRaw } from '@/router/types';
import {
  getTab,
  setTab,
  setEditTab,
  getEditTab,
  removeTabs,
  getBaseRoute,
} from './layout';

export default defineComponent({
  name: 'Layout',
  components: { menuHeader, SideMenu },
  setup() {
    const { backgroundColor, color } = menuStyle;
    let editTabValue = ref(getEditTab());
    let panes = reactive({
      tabs: [],
    });
    const currentComp = ref('');
    const router = useRouter();
    let isRouteActive = ref(true);
    function addTab(route: IAppRouteRecordRaw) {
      if (route.meta?.parent) {
        if (
          panes.tabs.some((el) => {
            return el.isActive;
          })
        ) {
          panes.tabs = panes.tabs.filter((el) => {
            return !el.isActive;
          });
        }
        router.replace({
          name: route.meta.transitionName,
          params: { id: route.meta.id },
        });
        editTabValue.value = route.name;
        setEditTab(route.name);
        panes.tabs.push(route);
        setTab(panes.tabs);
      } else {
        if (
          panes.tabs.some((el) => {
            return el.name === route.name;
          })
        ) {
          setEditTab(route.name);
        } else {
          setEditTab(route.name);
          panes.tabs.push(route);
          setTab(panes.tabs);
        }
        router.replace({ name: route.name }).then(() => {
          editTabValue.value = route.name;
        });
      }
    }
    provide('addTab', addTab);
    const removeTab = (targetName: string) => {
      if (targetName === editTabValue.value) {
        panes.tabs.forEach((item: IAppRouteRecordRaw, index) => {
          if (item.name === targetName) {
            let panesTab = panes.tabs[index + 1] || panes.tabs[index - 1];
            if (panesTab) {
              editTabValue.value = panesTab.name;
              router.push({ name: panesTab.name });
              setEditTab(panesTab.name);
            }
          }
        });
      }
      panes.tabs = panes.tabs.filter(
        (item: IAppRouteRecordRaw) => item.name !== targetName
      );
      setTab(panes.tabs);
      if (panes.tabs.length === 0) {
        router.push({ path: '/' });
      }
    };
    const tabClick = (tab) => {
      let tabs = getTab();
      let name = tab.props.name;
      let menuName = getBaseRoute();
      if (tabs) {
        if (menuName.indexOf(name) === -1) {
          let _r = tabs.find((el) => {
            return el.name === name;
          });
          router.replace({
            name: _r.meta.transitionName,
            params: { id: _r.meta.id },
          });
          setEditTab(tab.props.name);
        } else {
          router.replace({ name: tab.props.name });
          setEditTab(tab.props.name);
        }
      }
    };
    // 刷新当前页面
    function changeRouteActive() {
      isRouteActive.value = false;
      nextTick().then(() => {
        isRouteActive.value = true;
      });
    }
    provide('changeRouteActive', changeRouteActive);
    //清空tabs
    function clearTabs() {
      panes.tabs = [];
      removeTabs();
      router.replace({ name: 'dashboard' });
    }
    provide('clearTabs', clearTabs);
    const headerStyle = {
      backgroundColor: backgroundColor,
      color: color,
    };
    onMounted(() => {
      panes.tabs = getTab();
    });
    return {
      headerStyle,
      addTab,
      editTabValue,
      panes,
      tabClick,
      currentComp,
      removeTab,
      isRouteActive,
      changeRouteActive,
      clearTabs,
    };
  },
});
</script>

<style scoped></style>
