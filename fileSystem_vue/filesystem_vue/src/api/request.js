import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:8080', // 后端接口地址
  timeout: 8000
})

// 请求拦截器：自动携带 token
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers['token'] = token
  return config
}, error => Promise.reject(error))

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 1) {
    if (res.msg === 'NOT_LOGIN') {
      Message.error('登录已过期，请重新登录')
      localStorage.removeItem('token')
      location.href = '/login'
    } else {
      Message.error(res.msg || '请求失败')
    }
    return Promise.reject(res)
  }
  return res
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
