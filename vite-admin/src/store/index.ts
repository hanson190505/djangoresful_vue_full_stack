import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  // access: string;
  // refresh: string;
  token: { [k: string]: string };
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    token: {},
  },
});
