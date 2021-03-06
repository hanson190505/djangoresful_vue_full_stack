// import type {AxiosRequestConfig, AxiosResponse} from 'axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestOptions, IResult } from '@/utils/http/axios/types';

export abstract class AxiosTransform {
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: IRequestOptions
  ) => AxiosRequestConfig;
  transformRequestData?: (
    res: AxiosResponse<IResult>,
    options: IRequestOptions
  ) => any;
  requestCatch?: () => void;
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptors?: () => void;
  requestInterceptorsCatch?: () => void;
  responseInterceptorsCatch?: (error: Error) => void;
}
