import { defHttp } from '@/utils/http/axios';

export interface IProductCategory extends IMixinModel {
  pid: number | null;
  name: string;
}

export interface ICascader {
  value: number;
  name: string;
  children: ICascader[];
}

export function getCategory() {
  return defHttp.get({
    url: '/category',
  });
}

export function transformCategory(data: any[]) {
  let _data = JSON.parse(JSON.stringify(data));

  return _data.filter((p) => {
    const _arr = _data.filter((c) => c.pid === p.id);
    _arr.length && (p.children = _arr);
    return p.pid === null;
  });
}
