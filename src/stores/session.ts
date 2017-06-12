import { observable, action } from "mobx"
import { ISession } from "src/models"
import { SessionAPI, ILoginParams } from "src/apis"

class SessionStore {
  @observable isLogining: boolean = false
  @observable session: ISession

  @action async login(params: ILoginParams) {
    let success = false
    this.isLogining = true
    try {
      this.session = await SessionAPI.login(params)
      success = true
    } catch (e) {
      console.error(e)
    }
    this.isLogining = false
    return success
  }

  @action async userinfo() {
    let success = false
    try {
      this.session = await SessionAPI.userinfo()
      success = true
    } catch (e) {
      console.error(e)
    }
    return success
  }

  @action async logout() {
    let success = false
    try {
      this.session = await SessionAPI.logout()
      success = true
    } catch (e) {
      console.error(e)
    }
    return success
  }
}

export const sessionStore = new SessionStore()
