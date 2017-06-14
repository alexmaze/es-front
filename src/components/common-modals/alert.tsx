import * as React from "react"
import { autobind } from "core-decorators"

import { ICommonModalProps } from "src/utils"
import { Icon, Row, Col, Button } from "antd"
import { FormattedMessage as FM } from "react-intl"

export type AlertType = "info" | "error" | "success" | "warning"

export interface IAlertModalInput {
  type: AlertType
  title: JSX.Element | string
  content: JSX.Element | string
  okText?: JSX.Element | string
  cancelText?: JSX.Element | string
}

@autobind
export class AlertModal extends React.Component<ICommonModalProps<void, IAlertModalInput>, void> {

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
    const titleStyle = {
      color: "rgba(0,0,0,.65)",
      fontWeight: "700",
      fontSize: "14px"
    } as any

    const okText = this.props.data.okText || <FM id="modal.ok"/>
    const icon = getIcon(this.props.data.type)

    return (
      <div style={wrapperStyle}>
        <header>
          {icon}
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
              <Button size="large" type="primary" onClick={this.onOk}>{okText}</Button>
            </Col>
          </Row>
        </footer>
      </div>
    )
  }
}

function getIcon (type: AlertType) {
  const iconStyle = {
    fontSize: "24px",
    marginRight: "16px",
    float: "left"
  }
  switch (type) {
    case "error":
      return <Icon type="cross-circle" style={{...iconStyle, color: "#f04134"}} />
    case "success":
      return <Icon type="check-circle" style={{...iconStyle, color: "#00a854"}} />
    case "warning":
      return <Icon type="exclamation-circle" style={{...iconStyle, color: "#ffbf00"}} />
    case "info":
    default:
      return <Icon type="info-circle" style={{...iconStyle, color: "#108ee9"}} />
  }
}
