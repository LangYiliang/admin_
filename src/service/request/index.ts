import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading } from 'element-plus'

import { LYLRequestConfig, LYLRequestInterceptors } from './type'
const DEAFULT_LOADING = false
class LYLRequest {
  instance: AxiosInstance
  interceptors?: LYLRequestInterceptors
  loding?: any
  showLoading: boolean
  constructor(config: LYLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 使用实例拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都会添加的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('这是所有实例请求成功的拦截器', config)

        // 添加loding效果
        if (this.showLoading) {
          console.log(456)
          this.loding = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('这是所有实例请求失败的拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('这是所有实例响应成功的拦截器')

        // 移除loding效果
        this.loding?.close()
        // 失败情况一：根据服务器返回的错误做出拦截
        if (res.data.returnCode == 'ERR') {
          alert('相应失败')
        }
        // 这里拦截所有请求返回的数据，只返回data
        return res.data
      },
      (err) => {
        console.log('这是所有实例响应失败的拦截器')
        // 移除loding效果
        setTimeout(() => {
          this.loding?.close()
        }, 1000)
        // 失败情况二：根据返回的code码拦截
        if (err.response.status == 404) {
          alert('响应失败')
        }
        return err
      }
    )
  }

  request<T>(config: LYLRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
        })
    })
  }

  get<T>(config: LYLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: LYLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: LYLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: LYLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LYLRequest
