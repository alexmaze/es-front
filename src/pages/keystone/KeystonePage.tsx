import * as React from "react"
import { autobind } from "core-decorators"
import { RouteComponentProps } from "react-router-dom"
import { observer } from "mobx-react"
import { Tabs } from "antd"
import { FormattedMessage as FM } from "react-intl"

import { DomainTab } from "./domain-tab"

const TabPane = Tabs.TabPane

const tabs = [{
  title: <FM id="domain" />,
  content: <DomainTab />
}, {
  title: <FM id="project" />,
  content: <DomainTab />
}, {
  title: <FM id="user" />,
  content: <DomainTab />
}, {
  title: <FM id="group" />,
  content: <DomainTab />
}, {
  title: <FM id="role" />,
  content: <DomainTab />
}]

@observer
@autobind
export class KeystonePage extends React.Component<RouteComponentProps<{}>, void> {
  render() {
    return (
      <Tabs type="card">
        {tabs.map((tab, index) => (
          <TabPane key={index} tab={tab.title}>{tab.content}</TabPane>
        ))}
      </Tabs>
    )
  }
}
