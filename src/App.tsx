import * as React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { observer, Provider } from "mobx-react"
import { LocaleProvider } from "antd"
import { IntlProvider } from "react-intl"
import { ModalContainer } from "src/components/modal-container"
import { renderRoutes } from "react-router-config"
import createBrowserHistory from "history/createBrowserHistory"

import stores, { localeStore, sessionStore } from "src/stores"
import LoadingPage from "src/pages/loading"
import LoginPage from "src/pages/login"
import { routesConfig } from "./routes"

const history = createBrowserHistory()

@observer
export default class App extends React.Component<{}, {}> {

  render() {
    const { antd, locale, messages} = localeStore.config
    if (stores.sessionStore.isFetching) {
      return <LoadingPage />
    } else {
      return (
        <Provider {...stores}>
          <LocaleProvider locale={antd}>
            <IntlProvider locale={locale} messages={messages}>
              <div>
                <Router history={history}>
                  <Switch>
                    <Route exact={true} path="/login" component={LoginPage} />
                    {renderRoutes(routesConfig)}
                  </Switch>
                </Router>
                <ModalContainer />
              </div>
            </IntlProvider>
          </LocaleProvider>
        </Provider>
      )
    }
  }

  async componentWillMount() {
    await sessionStore.fetchSession()
    if (!sessionStore.session) {
      history.push("/login")
    }
  }
}
