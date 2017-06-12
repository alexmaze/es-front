export * from "./abstract-basic-restful-resource"
export * from "./session"
export * from "./template"

import axios from "axios"
import { message } from "antd"

axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  message.error(`API Error ${err.response.status}: ${err.response.statusText}`, 5)
  return Promise.reject(err)
})
