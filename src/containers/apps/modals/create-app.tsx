import * as React from "react"
import * as ReactDOM from "react-dom"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { Input, Modal, Form, Icon } from "antd"
import { ModalProps } from "antd/lib/modal/Modal.d"
import { IApp } from "src/models"

export interface ICreateAppModelProps {
  id: string
  modalProps: ModalProps
}

@observer
@autobind
export class CreateAppModal extends React.Component<ICreateAppModelProps, void> {

  static show (): Promise<IApp> {
    return new Promise((resolve, reject) => {
      const divId = "CREATE_APP_MODAL_" + new Date().getTime()
      const el = document.body.appendChild(document.createElement("div"))
      el.id = divId

      const props = observable({
        visible: true,
        onOk () {
          console.log(modal.refs.form)
          props.visible = false
          const form = modal.refs.form as any
          form.validateFields((err, values) => {
            if (!err) {
              this.props.onSubmit(values)
            }
          })
          resolve("hello")
        },
        onCancel () {
          props.visible = false
          reject()
        },
        afterClose () {
          ReactDOM.unmountComponentAtNode(el)
          document.getElementById(divId).remove()
        }
      })

      const modal = ReactDOM.render(<CreateAppModal id={divId} modalProps={props}/>, el) as CreateAppModal
    })
  }

  @observable defaultProps: ModalProps = {
    title: "Create New App",
    wrapClassName: "create-modal",
    closable: false,
    confirmLoading: false,
    okText: "Ok",
    cancelText: "Cancel"
  }

  render () {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }
    return (
      <Modal {...this.defaultProps} {...this.props.modalProps} >
        <Form ref="form" layout="horizontal">
          <Form.Item {...formItemLayout} label="Name" >
            <Input placeholder="App Name"/>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}
