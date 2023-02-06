import axios from 'axios'
console.log(888)

axios.defaults.baseURL = 'http//httpbin.org'
axios.defaults.timeout = 1000

// 请求拦截
// fn1:请求成功做的事情
// fn2:请求失败做的事情
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功')
    return config
  },
  (err) => {
    console.log(err, '请求失败')
    return err
  }
)

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功', res)
    return res
  },
  (err) => {
    console.log(err, '响应失败')
    return err
  }
)

axios.get('/get').then((res) => {
  console.log(res.data)
})
