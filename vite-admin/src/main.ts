import { createApp } from 'vue';
import App from './App.vue';
import { setupElement } from './setup/element-plus';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store/index';

const app = createApp(App);

setupElement(app);
setupRouter(app);
setupStore(app);
// app.use(store, key);

router.isReady().then(() => {
  app.mount('#app');
});
