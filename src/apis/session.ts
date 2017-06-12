import axios from "axios"
import { API_PREFIX } from "./config"
import { ISession } from "src/models"

export interface ILoginParams {
  username: string
  password: string
}

export class SessionAPI {
  public static login(params: ILoginParams): Promise<ISession> {
    return axios.post(`${API_PREFIX}/login`, {
      ...params
    }).then((res) => res.data.data)
  }

  public static userinfo(): Promise<ISession> {
    return axios.get(`${API_PREFIX}/user`).then((res) => res.data.data)
  }

  public static logout(): Promise<ISession> {
    return axios.delete(`${API_PREFIX}/logout`).then((res) => res.data.data)
  }
}
