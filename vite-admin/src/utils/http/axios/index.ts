import {
  ICreateAxiosOptions,
  IRequestOptions,
  IResult,
} from '@/utils/http/axios/types';
import { VAxios } from '@/utils/http/axios/Axios';
import { deepMerge, setObjToUrlParams } from '@/utils';
import { useGlobSetting } from '@/hooks/setting';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { AxiosTransform } from '@/utils/http/axios/axiosTransform';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isString } from '@/utils/is';
import { createNow, formatRequestDate } from '@/utils/http/axios/helper';
import { useMessage } from '@/hooks/web/useMessage';
import {} from 'qs';
// import { errorResult } from "@/utils/http/axios/const";
const globSetting = useGlobSetting();
const prefix = globSetting.urlPrefix;
const { createErrorMessage } = useMessage();

const transform: AxiosTransform = {
  /**
   * @description: 请求成功数据处理
   * @param res-AxiosResponse
   * @param options- IRequestOptions
   */
  transformRequestData: (
    res: AxiosResponse<IResult>,
    options: IRequestOptions
  ) => {
    const { isTransformRequestResult } = options;
    if (!isTransformRequestResult) {
      return res.data;
    }
    // const {data} = res
    // if (!data){
    //   return errorResult
    // }
    const { status, data, statusText } = res;
    if (statusText === ResultEnum.SUCCESS) {
      return data;
    }
    return res.data;
  },
  beforeRequestHook(config: AxiosRequestConfig, options: IRequestOptions) {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
    } = options;
    if (joinPrefix) {
      config.url = `${prefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    // const params = config.params || {};
    // if (config.method?.toUpperCase() === RequestEnum.GET) {
    //   if (!isString(params)) {
    //     // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
    //     config.params = Object.assign(params || {}, createNow(joinTime, false));
    //   } else {
    //     // 兼容restful风格
    //     config.url = config.url + params + `${createNow(joinTime, true)}`;
    //     config.params = undefined;
    //   }
    // } else {
    //   if (!isString(params)) {
    //     formatDate && formatRequestDate(params);
    //     config.data = params;
    //     config.params = undefined;
    //     if (joinParamsToUrl) {
    //       config.url = setObjToUrlParams(config.url as string, config.data);
    //     }
    //   } else {
    //     // 兼容restful风格
    //     config.url = config.url + params;
    //     config.params = undefined;
    //   }
    // }
    return config;
  },
  requestInterceptors: (config) => {
    //TODO:token处理
    return config;
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, message } = error || {};
    // console.log(response, message);
    const code: number = response?.status;
    if (!response) {
      createErrorMessage('服务器异常');
    }
    try {
      switch (code) {
        case 400:
          createErrorMessage('请求错误!');
          break;
        case 401:
          createErrorMessage('账号或密码错误!');
          break;
        case 404:
          createErrorMessage('请求的页面未找到!');
          break;
        default:
          break;
      }
    } catch (error) {
      throw new Error(error);
    }
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<ICreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        prefixUrl: prefix,
        headers: {
          'Content-type': ContentTypeEnum.JSON,
        },
        transform,
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          //忽略重复请求
          ignoreCancelToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();
