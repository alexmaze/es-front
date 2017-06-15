import * as React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon, Menu } from "antd"
import { History } from "history"
import { FormattedMessage as FM } from "react-intl"

export interface IMenuConfig {
  // ant icon type || JSX.Element
  icon: JSX.Element | string
  // locale id || JSX.Element
  title: JSX.Element | string
  // location url
  location: string
}

export interface ISidebarProps {
  history: History
  menuConfig: IMenuConfig[]
  collapsed: boolean
}

export class Sidebar extends React.Component<ISidebarProps, {}> {
  render() {
    const path = this.props.history.location.pathname
    const selected = "/" + path.split("/")[1]
    return (
      <div>
        <BrandLogo collapsed={this.props.collapsed} />
        <Menu theme="dark" mode="inline" selectedKeys={[selected]}>
          {
            this.props.menuConfig.map((config) => (
              <Menu.Item key={config.location}>
                <Link to={config.location}>
                  <LinkIcon icon={config.icon} />
                  <span style={{marginLeft: 10}}>
                    <LinkTitle title={config.title} collapsed={this.props.collapsed} />
                  </span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </div>
    )
  }
}

const BrandLogo = (props: { collapsed: boolean }) => {
  const logoImage = require("src/assets/images/logo.svg")
  const LogoWrapper = styled.div`
    text-align: center;
    padding: 30px 0;
  `
  return (
    <LogoWrapper>
      <img src={logoImage} />
    </LogoWrapper>
  )
}

const LinkIcon = (props: { icon: string | JSX.Element }) => {
  if (typeof props.icon === "string") {
    return <Icon type={props.icon} style={{fontSize: 14}} />
  }
  return props.icon as JSX.Element
}

const LinkTitle = (props: { title: string | JSX.Element; collapsed: boolean }) => {
  if (props.collapsed) {
    return null
  }
  if (typeof props.title === "string") {
    return <FM id={props.title} />
  }
  return props.title
}
