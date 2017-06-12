import * as React from "react"
import { observable, action, computed } from "mobx"
import { ModalProps } from "antd/lib/modal/Modal.d"
import { Modal } from "antd"

let ID = 0

export interface ICommonModalProps<IResult, IInput> {
  resolve: (result: IResult) => void
  reject: () => void
  data?: IInput
}

export interface IModal<IResult, IInput> {
  id: number
  modalProps: ModalProps
  Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>
  props: ICommonModalProps<IResult, IInput>
  data: IInput
}

class ModalStore {

  @observable
  modals: Array<IModal<any, any>> = []

  @action add<IResult, IInput>(
    modalProps: ModalProps,
    Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>,
    data: IInput): Promise<IResult> {
    const self = this

    return new Promise<IResult>((res, rej) => {

      const defaultProps = observable({
        visible: true,
        closable: false,
        confirmLoading: false,
        footer: null,
        ...modalProps
      })

      const id = ID++
      this.modals.push({
        id,
        Component,
        modalProps: defaultProps,
        data,
        props: {
          data,
          resolve: doResolve,
          reject: doReject
        }
      })

      function doResolve(result: IResult) {
        res(result)
        self.remove(id)
      }
      function doReject() {
        rej()
        self.remove(id)
      }
    })

  }

  @action remove(id: number) {
    const index = this.modals.findIndex((item) => item.id === id)
    if (index === -1)  {
      return
    }
    this.modals.splice(index, 1)
  }

}

export const modalStore = new ModalStore()
