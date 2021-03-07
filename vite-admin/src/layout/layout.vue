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
        <slot name="mainContext"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import SideMenu from './sideMenu.vue';
import menuHeader from './header.vue';
import { menuStyle } from '@/style';
import { useRouter } from 'vue-router';
import { IAppRouteRecordRaw, IMenu } from '@/router/types';
import {
  getTab,
  setTab,
  setEditTab,
  getEditTab,
  removeEditTab,
} from './layout';

export default defineComponent({
  name: 'Layout',
  components: { menuHeader, SideMenu },
  setup() {
    const { backgroundColor, color } = menuStyle;
    let editTabValue = ref(getEditTab());
    // let panes = getTab() as IAppRouteRecordRaw[];
    // let panes = reactive(getTab() as IAppRouteRecordRaw[]);
    let panes = reactive({
      tabs: getTab() as IAppRouteRecordRaw[],
    });
    const currentComp = ref('');
    const router = useRouter();

    const addTab = (route: IAppRouteRecordRaw) => {
      // editTabValue.value = route.name as string;
      setEditTab(route.name);
      editTabValue.value = route.name;
      if (panes.tabs.length > 0) {
        let tempList = panes.tabs.filter((item: IAppRouteRecordRaw) => {
          return item.name === route.name;
        });
        if (tempList.length === 0) {
          panes.tabs.push(route);
          setTab(panes.tabs);
        }
      } else {
        panes.tabs.push(route);
        setTab(panes.tabs);
      }
    };
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
      router.push({ name: tab.props.name });
      setEditTab(tab.props.name);
    };
    const headerStyle = {
      backgroundColor: backgroundColor,
      color: color,
    };
    return {
      headerStyle,
      addTab,
      editTabValue,
      panes,
      tabClick,
      currentComp,
      removeTab,
    };
  },
});
</script>

<style scoped></style>
