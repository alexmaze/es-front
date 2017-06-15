import * as React from "react"
import { autobind } from "core-decorators"
import { RouteComponentProps } from "react-router-dom"
import { observer } from "mobx-react"

@observer
@autobind
export class KeystonePage extends React.Component<RouteComponentProps<{}>, void> {
  render() {
    return <div>hello</div>
  }
}
