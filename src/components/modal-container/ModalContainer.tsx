import * as React from "react"
import { observer } from "mobx-react"
import { autobind } from "core-decorators"
import { Modal } from "antd"
import { modalStore } from "src/stores"

@observer
@autobind
export class ModalContainer extends React.Component<null, null> {

  render() {
    return (
      <div>
        {modalStore.modals.map((item) => (
          <Modal key={item.id} {...item.modalProps}>
            <item.Component {...item.props} />
          </Modal>
        ))}
      </div>
    )
  }
}
