import * as React from "react"
import styled from "styled-components"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { Dropdown, Icon, Menu } from "antd"
import { FormattedMessage as FM } from "react-intl"
import { sessionStore, routeStore } from "src/stores"

@observer
@autobind
export class Header extends React.Component<{}, {}> {

  handleLogout() {
    sessionStore.logout()
    routeStore.history.push("/login")
  }

  render() {
    const userMenu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleLogout}>
            <Icon type="logout" /> <FM id="common.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Wrapper>
        <Group>
          {/*left*/}
        </Group>
        <Group>
          {/*right*/}
          <Action>
            <Icon type="notification" />
            <FM id="notification" />
          </Action>
          <Dropdown overlay={userMenu}>
            <Action>
              <Icon type="user" />
              <FM id="user" />
            </Action>
          </Dropdown>
        </Group>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`

const Group = styled.div`
  height: 100%;
`

const Action = styled.a`
  font-size: 14px;
  height: 100%;
  color: #7a8599;
  padding: 0 10px;
  display: inline-block;
  i {
    font-size: 16px;
    margin-right: 6px;
  }
`
