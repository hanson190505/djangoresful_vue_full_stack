import type { RouteRecordRaw } from 'vue-router';
import { IMenu, IAppRouteRecordRaw } from '@/router/types';
import { RoleEnum } from '@/enums/roleEnum';
import { dynamicImport, dynamicViewsModules } from '../helper/roureHelper';

// export const myRoutes: IAppRouteRecordRaw[] = [
//   {
//     name: 'dashboard',
//     path: '/dashboard',
//     component: dynamicImport(dynamicViewsModules, 'dashboard'),
//     meta: {
//       ignoreAuth: false,
//     },
//   },
// ];
export const baseMenu: IMenu[] = [
  {
    name: 'Dashboard',
    icon: 'el-icon-s-home',
    roles: RoleEnum.GENERAL,
    meta: {
      title: '仪表盘',
    },
    route: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          ignoreAuth: false,
          title: '仪表盘',
        },
        component: dynamicImport(dynamicViewsModules, 'dashboard'),
      },
    ],
  },
  {
    name: 'Product',
    icon: 'el-icon-s-shop',
    roles: RoleEnum.GENERAL,
    meta: {
      title: '产品管理',
    },
    route: [
      {
        path: '/product',
        name: 'product',
        meta: {
          ignoreAuth: false,
          title: '产品列表',
        },
        component: dynamicImport(dynamicViewsModules, 'product'),
      },
      {
        path: '/product/:id',
        name: 'productDetail',
        meta: {
          ignoreAuth: false,
          title: '产品详情',
          hideMenu: true,
          parent: 'product',
          transitionName: 'productDetail',
        },
        component: dynamicImport(dynamicViewsModules, 'productDetail'),
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        meta: {
          ignoreAuth: false,
          title: '新增产品',
        },
        component: dynamicImport(dynamicViewsModules, 'addProduct'),
      },
      {
        path: '/category',
        name: 'category',
        meta: {
          ignoreAuth: false,
          title: '产品目录',
        },
        component: dynamicImport(dynamicViewsModules, 'categories'),
      },
    ],
  },
  {
    name: 'Upload',
    icon: 'el-icon-upload',
    roles: RoleEnum.GENERAL,
    meta: {
      title: '图片管理',
    },
    route: [
      {
        path: '/upload',
        name: 'upload',
        meta: {
          ignoreAuth: false,
          title: '图片上传',
        },
        component: dynamicImport(dynamicViewsModules, 'upload'),
      },
    ],
  },
];

// export function getRoutes(role: string): RouteRecordRaw[] {
//   let tempList: RouteRecordRaw[] = [];
//   baseMenu.forEach((el) => {
//     if (el.roles === role) {
//       tempList.push(...el.route);
//     }
//   });
//   return tempList;
// }

export function getRoutes(): RouteRecordRaw[] {
  let tempList: RouteRecordRaw[] = [];
  baseMenu.forEach((el) => {
    // TODO
    tempList.push(...el.route);
  });
  return tempList;
}

const routeList = getRoutes();

const loginRoute: RouteRecordRaw = {
  name: 'login',
  path: '/login',
  meta: {
    ignoreAuth: true,
  },
  component: () => import('@/views/login/login.vue'),
};

const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: 'dashboard',
  component: () => import('@/layout/layout.vue'),
  meta: {
    title: 'Home',
    icon: 'el-icon-s-home',
    ignoreAuth: true,
  },
  children: routeList,
};

export const routes = [loginRoute, rootRoute];
