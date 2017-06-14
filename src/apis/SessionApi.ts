// import axios from "axios"
import { ISession } from "src/models"
import { sleep } from "src/utils"

export interface ILoginParams {
  username: string
  password: string
}

export class SessionApi {
  public login(params: ILoginParams): Promise<ISession> {
    // return axios.post(`${API_PREFIX}/login`, {
    //   ...params
    // }).then((res) => res.data.data)
    return sleep<ISession>(1, {
      id: "1",
      name: "alex"
    })
  }

  public userinfo(): Promise<ISession> {
    // return axios.get(`${API_PREFIX}/user`).then((res) => res.data.data)
    return sleep<ISession>(0.2, {
      id: "1",
      name: "alex"
    })
  }

  public logout(): Promise<ISession> {
    // return axios.delete(`${API_PREFIX}/logout`).then((res) => res.data.data)
    return sleep<ISession>(1)
  }
}

export const sessionApi = new SessionApi
