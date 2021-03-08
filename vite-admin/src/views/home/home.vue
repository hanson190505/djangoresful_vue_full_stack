<template>
  <layout>
    <template #mainContext>
      <router-view v-slot="{ Component }" v-if="false">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layout/layout.vue';

export default defineComponent({
  name: 'home',
  components: {
    Layout,
  },
  setup() {
    // onBeforeRouteLeave((to, from, next) => {
    //   console.log('onBeforeRouteLeave');
    //   const answer = window.confirm(
    //     'Do you really want to leave? you have unsaved changes!'
    //   );
    //   // 取消导航并停留在同一页面上
    //   if (!answer) return false;
    // });
    // onBeforeRouteUpdate((to, from, next) => {
    //   console.log('onBeforeRouteUpdate');
    // });
  },
});
</script>

<style scoped></style>
