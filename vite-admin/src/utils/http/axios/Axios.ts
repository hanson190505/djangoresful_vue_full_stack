import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ICreateAxiosOptions,
  IRequestOptions,
  IResult,
  UploadFileParams,
} from '@/utils/http/axios/types';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import { isFunction } from '@/utils/is';
import { errorResult } from '@/utils/http/axios/const';
import { AxiosCanceler } from './axiosCancel';
import { ContentTypeEnum } from '@/enums/httpEnum';

export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: ICreateAxiosOptions;

  constructor(options: ICreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private createAxios(config: ICreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  configAxios(config: ICreateAxiosOptions): void {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  //设置通用headers
  setHeaders(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const { requestInterceptors, responseInterceptorsCatch } = transform;
    const axiosCanceler = new AxiosCanceler();
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const {
          headers: { ignoreCancelToken },
        } = config;
        // const ignoreCancel = ignoreCancelToken !== undefined ? this.options.requestOptions?.ignoreCancelToken
        const ignoreCancel =
          ignoreCancelToken !== undefined
            ? ignoreCancelToken
            : this.options.requestOptions.ignoreCancelToken;
        !ignoreCancel && axiosCanceler.addPending(config);
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config);
        }
        return config;
      },
      undefined
    );
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: IRequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: IRequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: IRequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: IRequestOptions
  ): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: IRequestOptions = Object.assign({}, requestOptions, options);
    const { beforeRequestHook, transformRequestData } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<IResult>>(conf)
        .then((res: AxiosResponse<IResult>) => {
          if (transformRequestData && isFunction(transformRequestData)) {
            const ret = transformRequestData(res, opt);
            ret !== errorResult
              ? resolve(ret)
              : reject(new Error('request error!'));
            return;
          }
          resolve((res as unknown) as Promise<T>);
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }
}
