import { defHttp } from '@/utils/http/axios';
import { IProduct } from '@/api/products/model/products';

enum Api {
  Product = '/product/',
}

export function getProductsAPI() {
  return defHttp.request<IProduct>({
    url: Api.Product,
  });
}
