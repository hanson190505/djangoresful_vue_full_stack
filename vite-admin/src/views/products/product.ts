import { defHttp } from '@/utils/http/axios';
import { IProduct } from '@/api/products/model/products';

enum Api {
  Product = '/product/',
}

export function getProductsAPI(page: number) {
  return defHttp.request<IProduct>({
    url: Api.Product,
    params: {
      page: page,
    },
  });
}

export function postProduct(data: IProduct) {
  return defHttp.request<IProduct>({
    url: Api.Product,
    method: 'POST',
    data: data,
  });
}

export function getProductById(id: number) {
  return defHttp.request<IProduct>({
    url: Api.Product + id,
    method: 'GET',
  });
}
