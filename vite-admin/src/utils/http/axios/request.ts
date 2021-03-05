import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';
import { useGlobSetting } from '@/hooks/setting';
import { ContentTypeEnum } from '@/enums/httpEnum';

const globSetting = useGlobSetting();

interface IAxiosConfig extends AxiosRequestConfig {}

const config: IAxiosConfig = {
  baseURL: `${globSetting.apiUrl}${globSetting.urlPrefix}`,
  headers: {
    'Content-type': ContentTypeEnum.JSON,
  },
  timeout: 10 * 1000,
};
export class CAxios {
  private axiosInstance: AxiosInstance;
  private options?: IAxiosConfig;
  constructor(config: IAxiosConfig) {
    this.axiosInstance = axios.create(config);
    this.options = config;
  }
}

export const request = axios.create(config);
