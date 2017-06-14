import { observable, action } from "mobx"
import { ISession } from "src/models"
import { sessionApi, ILoginParams } from "src/apis"

export class SessionStore {
  @observable isLogining = false
  @observable session: ISession

  @action async login(params: ILoginParams) {
    let success = false
    this.isLogining = true
    try {
      this.session = await sessionApi.login(params)
      success = true
    } catch (e) {
      console.error(e)
    }
    this.isLogining = false
    return success
  }

  @action async fetchSession() {
    let success = false
    try {
      this.session = await sessionApi.userinfo()
      success = true
    } catch (e) {
      console.error(e)
    }
    return success
  }

  @action async logout() {
    let success = false
    try {
      this.session = await sessionApi.logout()
      success = true
    } catch (e) {
      console.error(e)
    }
    return success
  }
}
