import * as React from "react"
import { autobind } from "core-decorators"
import { RouteComponentProps } from "react-router-dom"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { LocaleSwitch } from "src/components/locale-switch"
import { sessionStore } from "src/stores"
import { ILoginParams } from "src/apis"
import { FormattedMessage } from "react-intl"

import "./style.less"
import LoginForm from "src/components/login-form"

@observer
@autobind
export default class LoginPage extends React.Component<RouteComponentProps<{}>, void> {

  @observable isError = false

  async onSubmit({ username, password }: ILoginParams) {
    if (!username || !password) {
      return
    }
    const isSuccess = await sessionStore.login({ username, password })
    if (isSuccess) {
      this.props.history.push("/keystone")
    } else {
      this.isError = true
    }
  }

  handleFocus() {
    this.isError = false
  }

  render() {
    const loginFormProps = {
      onSubmit: this.onSubmit,
      handleFocus: this.handleFocus,
      isLogining: sessionStore.isLogining,
      isError: this.isError
    }
    return (
      <div className="login-page">
        <main>
          <Brand />
          <LoginForm {...loginFormProps} />
        </main>
        <footer>
          <p><FormattedMessage id="app.copyright" /></p>
          <LocaleSwitch history={this.props.history} />
        </footer>
      </div>
    )
  }
}

const logoImage = require("src/assets/images/logo_primary.svg")
const Brand = () => {
  return (
    <div className="info">
      <div className="brand">
        <img className="logo" src={logoImage} />
        <span className="title"><FormattedMessage id="app.name" /></span>
      </div>
      <span className="sub-title"><FormattedMessage id="app.fullname" /></span>
    </div>
  )
}
