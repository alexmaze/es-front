import * as React from "react"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"

@observer
@autobind
export class DomainTab extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        DOMAIN
      </div>
    )
  }
}
