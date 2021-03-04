import { defHttp } from '@/utils/http/axios';

interface IUpload {
  url: string;
  owner: string;
}

export function getProductsAPI(): Promise<IUpload> {
  return defHttp.request({
    url: '/upload/',
  });
}
