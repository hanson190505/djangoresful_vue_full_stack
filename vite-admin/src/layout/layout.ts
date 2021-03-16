import { IAppRouteRecordRaw, IMenu } from '@/router/types';
import { Ref } from 'vue';
import { baseMenu } from '@/router/routes/index';

const storage = window.localStorage;

export function setTab(params: IAppRouteRecordRaw[]) {
  storage.setItem('tabs', JSON.stringify(params));
}

export function getTab(): IAppRouteRecordRaw[] | string | null {
  let _tabs = storage.getItem('tabs');
  if (_tabs) {
    return JSON.parse(_tabs);
  } else {
    return [];
  }
}

export function removeTabs() {
  storage.removeItem('tabs');
}

export function setEditTab(params: string) {
  storage.setItem('editTab', params);
}

export function getEditTab(): string {
  let _editTab = storage.getItem('editTab');
  if (_editTab) {
    return _editTab;
  } else {
    return '';
  }
}

export function removeEditTab() {
  storage.removeItem('editTab');
}

export function handleAddTab(
  route: IAppRouteRecordRaw,
  editTabValue: Ref,
  panes: any
) {
  // setEditTab(route.name);
  // editTabValue.value = route.name;
  // let promise = new Promise((resolve, reject) => {
  //   if (panes.tabs.length > 0) {
  //     let tempList = panes.tabs.filter((item: IAppRouteRecordRaw) => {
  //       return item.name === route.name;
  //     });
  //     if (tempList.length === 0) {
  //       panes.tabs.push(route);
  //       setTab(panes.tabs);
  //       resolve(route);
  //     }
  //   } else {
  //     console.log(route);
  //     panes.tabs.push(route);
  //     setTab(panes.tabs);
  //     resolve(route);
  //   }
  //   console.log(route);
  //   reject();
  // });
  // return promise;
}

export function getBaseRoute(menus = baseMenu) {
  let _names = [] as string[];
  menus.forEach((item) => {
    if (item.route) {
      item.route.forEach((el) => {
        _names.push(el.name);
      });
    }
  });
  return _names;
}
