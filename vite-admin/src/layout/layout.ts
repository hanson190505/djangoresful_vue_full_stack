import { IAppRouteRecordRaw, IMenu } from '@/router/types';

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
