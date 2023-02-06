import { createApp } from 'vue'
// import '@/service/request/axios_demo'
import lylrequest from './service'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
lylrequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    // 单独请求的拦截
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的response')
        return res
      }
    },
    showLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
