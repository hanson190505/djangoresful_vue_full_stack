import { Router } from 'vue-router';
import { getRoutes } from '@/router/routes';
import { dynamicImport, dynamicViewsModules } from '../helper/roureHelper';
import { store } from '@/store';
import { useStorage } from '@/hooks/cach/storage';

const { getToken } = useStorage();

export function permissionGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    if (!to.meta.ignoreAuth) {
      const token = store.state.token && getToken();
      if (token !== undefined && token.access) {
        return true;
      } else {
        return 'login';
      }
    }
    // const routes = getRoutes();
    // // if (to.name === undefined) {
    // //   await router.replace('/');
    // // }
    // routes.forEach((route) => {
    //   router.addRoute('Root', route);
    // });
    return true;
  });
}
