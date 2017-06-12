import * as React from "react"
import * as ReactDOM from "react-dom"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { ModalProps } from "antd/lib/modal/Modal.d"
import { Modal } from "antd"

import { ICommonModalProps, modalStore } from "src/stores"
import { ConfirmModal, IConfirmModalInput } from "src/components/common-modals/confirm"
import { AlertModal, IAlertModalInput, AlertType } from "src/components/common-modals/alert"

export {
  ICommonModalProps
}

@autobind
export class ModalFactory {

  static create<IResult, IInput> (
    modalProps: ModalProps,
    Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>,
    data?: IInput): Promise<IResult> {
    return modalStore.add(modalProps, Component, data)
  }

  static confirm (data: IConfirmModalInput, modalProps?: ModalProps) {
    modalProps = {
      ...modalProps,
      width: 416
    }
    return modalStore.add<void, IConfirmModalInput> (modalProps, ConfirmModal, data)
  }

  static alert (type: AlertType, data: IAlertModalInput, modalProps?: ModalProps) {
    modalProps = {
      ...modalProps,
      width: 416
    }
    return modalStore.add<void, IAlertModalInput> (modalProps, AlertModal, {
      ...data,
      type
    })
  }

  static info (data: IAlertModalInput, modalProps?: ModalProps) {
    ModalFactory.alert("info", data, modalProps)
  }

  static success (data: IAlertModalInput, modalProps?: ModalProps) {
    ModalFactory.alert("success", data, modalProps)
  }

  static error (data: IAlertModalInput, modalProps?: ModalProps) {
    ModalFactory.alert("error", data, modalProps)
  }

  static warning (data: IAlertModalInput, modalProps?: ModalProps) {
    ModalFactory.alert("warning", data, modalProps)
  }

}
