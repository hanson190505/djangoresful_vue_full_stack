import type { RouteRecordRaw } from 'vue-router';
import { IMenu } from '@/router/types';
import { RoleEnum } from '@/enums/roleEnum';
import { dynamicImport, dynamicViewsModules } from '../helper/roureHelper';

const add = 'addProduct';
export const baseMenu: IMenu[] = [
  {
    name: 'Dashboard',
    icon: 'el-icon-s-home',
    roles: RoleEnum.GENERAL,
    route: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(`@/views/dashboard/dashboard.vue`),
      },
    ],
  },
  {
    name: 'Product',
    icon: 'el-icon-s-home',
    roles: RoleEnum.GENERAL,
    route: [
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/products/product.vue'),
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        component: dynamicImport(dynamicViewsModules, 'addProduct'),
      },
    ],
  },
  {
    name: 'Upload',
    icon: 'el-icon-upload',
    roles: RoleEnum.GENERAL,
    route: [
      {
        path: '/upload',
        name: 'upload',
        component: dynamicImport(dynamicViewsModules, 'upload'),
      },
    ],
  },
];

export function getRoutes(role: string): RouteRecordRaw[] {
  let tempList: RouteRecordRaw[] = [];
  baseMenu.forEach((el) => {
    if (el.roles === role) {
      tempList.push(...el.route);
    }
  });
  return tempList;
}

const loginRoute: RouteRecordRaw = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/login/login.vue'),
};

const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: () => import('@/views/home/home.vue'),
  meta: {
    title: 'Home',
    icon: 'el-icon-s-home',
  },
};

export const routes = [loginRoute, rootRoute];
