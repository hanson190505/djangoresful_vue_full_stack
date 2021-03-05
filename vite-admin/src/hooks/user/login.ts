import { defHttp } from '@/utils/http/axios';
import { useStore } from 'vuex';
import { key } from '@/store/index';

export interface ILoginUser {
  username: string;
  password: string;
}

export async function login(data: ILoginUser) {
  const store = useStore(key);
  const token = await defHttp.post({
    url: '/token/',
    data: data,
  });
  store.state.token = token;
}
