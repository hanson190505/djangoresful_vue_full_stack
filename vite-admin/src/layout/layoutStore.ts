import { IAppRouteRecordRaw } from '@/router/types';
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

@Module
export class MenuStore extends VuexModule {
  private editTab: string = '';
  private tabs: IAppRouteRecordRaw[] = [];
  private storage = window.localStorage;

  private setTab(params: IAppRouteRecordRaw[]) {
    this.storage.setItem('tabs', JSON.stringify(params));
  }

  private getTab(): IAppRouteRecordRaw[] | string | null {
    let _tabs = this.storage.getItem('tabs');
    if (_tabs) {
      return JSON.parse(_tabs);
    } else {
      return [];
    }
  }

  private setEditTab(params: string) {
    this.storage.setItem('editTab', params);
  }

  private getEditTab(): string {
    let _editTab = this.storage.getItem('editTab');
    if (_editTab) {
      return _editTab;
    } else {
      return '';
    }
  }

  private removeEditTab() {
    this.storage.removeItem('editTab');
  }

  @Mutation
  commitEditTabState(tab: string): void {
    this.editTab = tab;
  }
}
