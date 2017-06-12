import "./style.less"
import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { sessionStore } from "src/stores"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"

import { Header } from "src/components/header"
import { Sidebar } from "src/components/sidebar"
import { AppsPage } from "src/pages/apps"
import { TemplatesPage } from "src/pages/templates"

@observer
export class MainPage extends React.Component<RouteComponentProps<void>, void> {

  render() {
    return (
      <div className="main-page">
        <Header history={this.props.history} />
        <main>
          <Sidebar history={this.props.history} />
          <div className="sub-pages">
            <Route exact={true} path="/apps" component={AppsPage} />
            <Route exact={true} path="/templates" component={TemplatesPage} />
          </div>
        </main>
      </div>
    )
  }

  componentWillMount() {
    if (!sessionStore.session) {
      this.props.history.push("/login")
    } else if (this.props.location.pathname === "/") {
      this.props.history.push("/apps")
    }
  }
}
