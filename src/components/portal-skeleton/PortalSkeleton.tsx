import * as React from "react"
import { observer } from "mobx-react"
import { renderRoutes, RouteConfigComponentProps } from "react-router-config"
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   Switch
// } from "react-router-dom"

// import { Header } from "src/components/header"
// import { Sidebar } from "src/components/sidebar"
// import { AppsPage } from "src/pages/apps"
// import { TemplatesPage } from "src/pages/templates"

@observer
export default class PortalSkeleton extends React.Component<RouteConfigComponentProps<{}>, {}> {

  render() {
    const routes = this.props.route.routes
    return (
      <div className="main-page">
        {/*<Header history={this.props.history} />*/}
        <main>
          {/*<Sidebar history={this.props.history} />*/}
          <div className="sub-pages">
            what?
            {renderRoutes(routes)}
            {/*<Route exact={true} path="/apps" component={AppsPage} />*/}
            {/*<Route exact={true} path="/templates" component={TemplatesPage} />*/}
          </div>
        </main>
      </div>
    )
  }

}
