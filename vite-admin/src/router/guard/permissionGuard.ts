import { Router } from 'vue-router';
import { getRoutes } from '@/router/routes';
import { dynamicImport, dynamicViewsModules } from '../helper/roureHelper';
import { getToken } from '@/store/modules/user';

export function permissionGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    if (!to.meta.ignoreAuth) {
      const token = getToken();
      if (token !== undefined && token.access) {
        return true;
      } else {
        return 'login';
      }
    }
    return true;
  });
}
