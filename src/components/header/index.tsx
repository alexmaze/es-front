import "./style.less"

import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { autobind } from "core-decorators"
import { Icon } from "antd"
import { sessionStore } from "src/stores"
import { History } from "history"
import { FormattedMessage as FM } from "react-intl"

import { LocaleSwitch } from "src/components/locale-switch"

interface IHeaderProps {
  history: History
}

@autobind
export class Header extends React.Component<IHeaderProps, void> {

  async logout() {
    const isSuccess = await sessionStore.logout()
    if (isSuccess) {
      this.props.history.push("/login")
    }
  }

  render() {
    const logoImage = require("../../assets/logo_primary.svg")
    return (
      <header className="qbus-header">
        <div className="brand">
          <img className="logo-image" src={logoImage} />
          <span className="logo-text"><FM id="app.name" /></span>
        </div>
        <div className="actions">
          <LocaleSwitch history={this.props.history} />
          <Icon onClick={this.logout} type="logout" />
        </div>
      </header>
    )
  }
}
