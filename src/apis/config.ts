import axios, { AxiosResponse, AxiosError } from "axios"
import { message } from "antd"

const API_PREFIX = "/api/v1.0"

export function initAxios() {
  // Init prefix
  axios.defaults.baseURL = API_PREFIX

  // Error interceptor
  axios.interceptors.response.use((response: AxiosResponse) => {
    return response
  }, (err: AxiosError) => {
    // TODO define and translate errors
    message.error(`API Error ${err.response.status}: ${err.response.statusText}`, 5)
    return Promise.reject(err)
  })
}
