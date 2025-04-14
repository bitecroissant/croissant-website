import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

axios.defaults.baseURL = isDev ? 'http://localhost:8888' : 'https://api.bytejelly.uno'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config) => {
  const jwt = window.localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
})

export const ajax = {
  get: <T>(path: string, config?: AxiosRequestConfig) => {
    return axios.get<T>(path, config)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  put: <T>(path: string) => {
    return axios.put<T>(path)
  },
  patch: <T>(path: string) => {
    return axios.patch<T>(path)
  },
  delete: <T>(path: string) => {
    return axios.delete<T>(path)
  },
}
