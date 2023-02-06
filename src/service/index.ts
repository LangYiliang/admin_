import LYLRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'
const lylrequest = new LYLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 某个实例的拦截
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的请求拦截
      const token = ''
      if (token) {
        // 这里具体怎么携带token看后端怎么要求
        config.header.Authorization = `Bearer ${token}`
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default lylrequest
