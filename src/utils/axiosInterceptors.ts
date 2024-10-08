import axios from 'axios'

axios.defaults.withCredentials = true

// Add a request interceptor 请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log('请求拦截器：', config)
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor 响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log('响应拦截器：', response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
