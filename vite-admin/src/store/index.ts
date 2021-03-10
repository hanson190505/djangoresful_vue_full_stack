import { InjectionKey, App } from 'vue';
import { createStore, Store } from 'vuex';
import { UserModule } from './modules/user';
import { ProductModule } from './modules/product';

const store = createStore({
  modules: {
    user: UserModule,
    product: ProductModule,
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
