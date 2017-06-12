import axios, { AxiosRequestConfig } from "axios"
import { IResponse } from "src/models"
import { API_PREFIX } from "./config"

export abstract class BasicRestfulResource<T> {

  constructor(public url: string) {}

  public all(config?: AxiosRequestConfig): Promise<IResponse<T[]>> {
    return axios.get(this.url, config).then((res) => res.data)
  }

  public get(id: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    const url = `${this.url}/${id}`
    return axios.get(url, config).then((res) => res.data)
  }

  public create(obj: T, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return axios.post(this.url, obj, config).then((res) => res.data)
  }

  public update(id: string, obj: T, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    const url = `${this.url}/${id}`
    return axios.put(url, obj, config).then((res) => res.data)
  }

  public delete(id: string, config?: AxiosRequestConfig): Promise<IResponse<void>> {
    const url = `${this.url}/${id}`
    return axios.delete(url, config).then((res) => res.data)
  }
}
