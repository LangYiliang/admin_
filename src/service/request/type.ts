import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LYLRequestInterceptors {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (err: any) => any
}

export interface LYLRequestConfig extends AxiosRequestConfig {
  interceptors?: LYLRequestInterceptors
  showLoading?: boolean
}
