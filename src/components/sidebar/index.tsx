import "./style.less"

import * as React from "react"
import { Link } from "react-router-dom"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { Icon, Menu } from "antd"
import { History } from "history"
import { FormattedMessage } from "react-intl"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface ISidebarProps {
  history: History
}

@autobind
export class Sidebar extends React.Component<ISidebarProps, void> {
  render() {
    return (
      <Menu
        style={{ width: 240 }}
        mode="inline"
        selectedKeys={[this.props.history.location.pathname]}
      >
        <Menu.Item key="/apps">
          <Link to="/apps"><Icon type="appstore" /> <FormattedMessage id="common.app" values={{count: "2"}} /></Link>
        </Menu.Item>
        <Menu.Item key="/templates">
          <Link to="/templates"><Icon type="appstore" /> <FormattedMessage id="common.template" values={{count: "2"}} /></Link>
        </Menu.Item>
      </Menu>
    )
  }
}
