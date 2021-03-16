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

export function setProductIDStorage(id: number) {
  window.localStorage.setItem('productID', id.toString());
}

export function getProductIDStorage(): number | undefined {
  let _id = window.localStorage.getItem('productID');
  if (_id) {
    return parseInt(_id);
  }
}
