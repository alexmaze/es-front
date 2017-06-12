import "./style.less"
import * as React from "react"
import { autobind } from "core-decorators"
import { RouteComponentProps } from "react-router-dom"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import { LoginForm } from "src/components/login-form"
import { LocaleSwitch } from "src/components/locale-switch"
import { sessionStore } from "src/stores"
import { ILoginParams } from "src/apis"
import { FormattedMessage } from "react-intl"

@observer
@autobind
export class LoginPage extends React.Component<RouteComponentProps<void>, void> {

  store = sessionStore
  @observable
  isError = false

  async onSubmit({ username, password }: ILoginParams) {
    if (!username || !password) {
      return
    }
    const isSuccess = await sessionStore.login({ username, password })
    if (isSuccess) {
      this.props.history.push("/")
    } else {
      this.isError = true
    }
  }

  handleFocus() {
    this.isError = false
  }

  render() {
    console.log("render login")
    const loginFormProps = {
      onSubmit: this.onSubmit,
      handleFocus: this.handleFocus,
      isLogining: this.store.isLogining,
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

const logoImage = require("../../assets/logo_primary.svg")
const Brand = (props) => {
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
