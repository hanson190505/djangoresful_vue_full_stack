import { createApp } from 'vue';
import App from './App.vue';
import { setupElement } from './setup/element-plus';
import router, { setupRouter } from '@/router';
import { key, store } from './store';

const app = createApp(App);

setupElement(app);
setupRouter(app);
app.use(store, key);

router.isReady().then(() => {
  app.mount('#app');
});
