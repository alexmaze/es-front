import * as React from "react"
import { Row, Col, Button } from "antd"
import { FormattedMessage as FM } from "react-intl"

export interface ICommonModalFooterProps {
  onOk: () => void
  onCancel: () => void
  okText?: JSX.Element | string
  cancelText?: JSX.Element | string
}

export const CommonModalFooter = (props: ICommonModalFooterProps) => {
  const style = {
    margin: "0 -16px -16px",
    padding: "10px 16px",
    borderTop: "1px solid #e9e9e9"
  }

  const okText = props.okText || <FM id="modal.ok"/>
  const cancelText = props.cancelText || <FM id="modal.cancel"/>

  return (
    <footer style={style}>
      <Row type="flex" justify="end" gutter={10}>
        <Col>
          <Button size="large" onClick={props.onCancel}>{cancelText}</Button>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={props.onOk}>{okText}</Button>
        </Col>
      </Row>
    </footer>
  )
}
