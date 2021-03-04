import { defHttp } from '@/utils/http/axios';

interface IUpload extends IMixinModel {
  url: string;
  owner?: string;
}

export function getProductsAPI(): Promise<IUpload> {
  return defHttp.request({
    url: '/image/',
  });
}
