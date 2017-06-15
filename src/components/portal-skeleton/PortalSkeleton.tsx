import * as React from "react"
import styled from "styled-components"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { autobind } from "core-decorators"
import { renderRoutes, RouteConfigComponentProps } from "react-router-config"
import { Layout } from "antd"

import { Sidebar, IMenuConfig } from "src/components/sidebar"
import { Header } from "src/components/header"

const menuConfig: IMenuConfig[] = [{
  icon: "appstore",
  title: "keystone.manage",
  location: "/keystone"
}]

@observer
@autobind
export default class PortalSkeleton extends React.Component<RouteConfigComponentProps<{}>, {}> {

  @observable isSideCollapsed = false

  handleSideCollapsed () {
    this.isSideCollapsed = !this.isSideCollapsed
  }

  render () {
    const routes = this.props.route.routes
    return (
      <Page>
        <Layout.Sider width={230} collapsible collapsed={this.isSideCollapsed} onCollapse={this.handleSideCollapsed}>
          <Sidebar history={this.props.history} menuConfig={menuConfig} collapsed={this.isSideCollapsed} />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{backgroundColor: "#FFFFFF"}}>
            <Header />
          </Layout.Header>
          <Layout.Content>
            {renderRoutes(routes)}
          </Layout.Content>
        </Layout>
      </Page>
    )
  }
}

const Page = styled(Layout)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`
