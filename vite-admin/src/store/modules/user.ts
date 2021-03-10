import { defHttp } from '@/utils/http/axios';
import { ILoginUser } from '@/views/login/login';

export interface IToken {
  access: string;
  refresh: string;
}

const storage = window.localStorage;

export function setToken(params: IToken) {
  storage.setItem('token', JSON.stringify(params));
}

export function getToken(): IToken | void {
  let _token = storage.getItem('token');
  if (_token) {
    return JSON.parse(_token);
  }
}

export function removeToken() {
  storage.removeItem('token');
}

export const UserModule = {
  namespaced: true,
  state: () => ({
    token: <IToken>{},
    user: {},
    test: 0,
  }),
  mutations: {
    commitToken(state, token) {
      state.token = token;
    },
    commitUser(state, user) {
      state.user = user;
    },
    commitTest(state, test) {
      state.test = test;
    },
  },
  actions: {
    async login({ commit }, data: ILoginUser) {
      const token = await defHttp.post({
        url: '/token/',
        data: data,
      });
      commit('commitToken', token);
      setToken(token);
    },
    test({ commit }, test) {
      commit('commitTest', test);
    },
  },
};
