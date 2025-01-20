import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

import i18n from '@/i18n'

// 假设你的国际化配置在这个路径

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:8080/jeecg-boot', // 设置基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = uni.getStorageSync('token')
    if (token)
      config.headers.set('Authorization', `Bearer ${token}`)

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response

    if (!data.success) {
      uni.showToast({
        title: data.message || i18n.global.t('request.requestFailed'),
        icon: 'none',
      })
      return Promise.reject(new Error(data.message || i18n.global.t('request.requestFailed')))
    }

    return data.result
  },
  (error: unknown) => {
    const { response } = error as { response?: { status: number } }

    if (response && response.status) {
      switch (response.status) {
        case 401:
          uni.showToast({
            title: i18n.global.t('request.unauthorized'),
            icon: 'none',
          })
          // 可以在这里处理登出逻辑
          break
        case 403:
          uni.showToast({
            title: i18n.global.t('request.forbidden'),
            icon: 'none',
          })
          break
        case 404:
          uni.showToast({
            title: i18n.global.t('request.notFound'),
            icon: 'none',
          })
          break
        case 500:
          uni.showToast({
            title: i18n.global.t('request.serverError'),
            icon: 'none',
          })
          break
        default:
          uni.showToast({
            title: i18n.global.t('request.networkError'),
            icon: 'none',
          })
      }
    }
    else {
      if (!window.navigator.onLine) {
        uni.showToast({
          title: i18n.global.t('request.networkDisconnected'),
          icon: 'none',
        })
      }
      else {
        uni.showToast({
          title: i18n.global.t('request.requestFailed'),
          icon: 'none',
        })
      }
    }
    return Promise.reject(error)
  },
)

// 封装 GET 请求
export function get<T>(url: string, params?: any): Promise<T> {
  return request.get(url, { params })
}

// 封装 POST 请求
export function post<T>(url: string, data?: any): Promise<T> {
  return request.post(url, data)
}

// 封装 PUT 请求
export function put<T>(url: string, data?: any): Promise<T> {
  return request.put(url, data)
}

// 封装 DELETE 请求
export function del<T>(url: string): Promise<T> {
  return request.delete(url)
}

export interface Result<T> {
  // 成功标志
  success: boolean
  // 返回处理消息
  message: string
  // 返回代码
  code: number
  // 错误代码
  errCode?: string
  // 返回数据对象
  result?: T
  // 时间戳
  timestamp: number
}
