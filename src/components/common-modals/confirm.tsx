import * as React from "react"
import { autobind } from "core-decorators"

import { ICommonModalProps } from "src/utils"
import { Icon, Row, Col, Button } from "antd"
import { FormattedMessage as FM } from "react-intl"

export interface IConfirmModalInput {
  title: JSX.Element | string
  content: JSX.Element | string
  okText?: JSX.Element | string
  cancelText?: JSX.Element | string
}

@autobind
export class ConfirmModal extends React.Component<ICommonModalProps<void, IConfirmModalInput>, void> {

  onCancel () {
    this.props.reject()
  }

  onOk () {
    this.props.resolve(undefined)
  }

  render () {
    const wrapperStyle = {
      padding: "14px 24px"
    }
    const iconStyle = {
      color: "#ffbf00",
      fontSize: "24px",
      marginRight: "16px",
      float: "left"
    }
    const titleStyle = {
      color: "rgba(0,0,0,.65)",
      fontWeight: "700",
      fontSize: "14px"
    } as any

    const okText = this.props.data.okText || <FM id="modal.ok"/>
    const cancelText = this.props.data.cancelText || <FM id="modal.cancel"/>

    return (
      <div style={wrapperStyle}>
        <header>
          <Icon type="question-circle" style={iconStyle} />
          <span style={titleStyle}>
            {this.props.data.title}
          </span>
        </header>
        <main style={{margin: "8px 0 30px 42px"}}>
          {this.props.data.content}
        </main>
        <footer>
          <Row type="flex" justify="end" gutter={10}>
            <Col>
              <Button size="large" onClick={this.onCancel}>{cancelText}</Button>
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={this.onOk}>{okText}</Button>
            </Col>
          </Row>
        </footer>
      </div>
    )
  }
}
