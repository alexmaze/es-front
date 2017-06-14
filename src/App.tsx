import * as React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { autobind } from "core-decorators"
import { Spin, LocaleProvider } from "antd"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { IntlProvider } from "react-intl"

import { LoginPage } from "src/pages/login"
import { MainPage } from "src/pages/main"
import { ModalContainer } from "src/components/modal-container"

import { sessionStore, localeStore } from "src/stores"

@observer
@autobind
export class App extends React.Component<null, null> {

  @observable
  isChecking = true

  render() {
    if (this.isChecking) {
      return (
        <div className="app-loading">
          <Spin size="large" />
        </div>
      )
    } else {
      return (
        <LocaleProvider locale={localeStore.config.antd}>
          <IntlProvider locale={localeStore.config.locale} messages={localeStore.config.messages}>
            <div>
              <Router>
                <Switch>
                  <Route exact={true} path="/login" component={LoginPage} />
                  <Route path="/" component={MainPage} />
                </Switch>
              </Router>
              <ModalContainer />
            </div>
          </IntlProvider>
        </LocaleProvider>
      )
    }
  }

  async componentWillMount() {
    this.isChecking = true
    await sessionStore.userinfo()
    this.isChecking = false
  }
}
