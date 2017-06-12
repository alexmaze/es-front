import * as React from "react"
import * as ReactDOM from "react-dom"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { FormattedMessage as FM } from "react-intl"
import { Input, Form, Icon, Radio, Row, Col, Button } from "antd"
import { FormComponentProps } from "antd/lib/form/Form"

import { ITemplate } from "src/models"
import { ICommonModalProps } from "src/utils"
import { CommonModalFooter } from "src/components/common-modal-footer"
import { localeStore } from "src/stores"

@observer
@autobind
export class CreateTemplateModal extends React.Component<ICommonModalProps<ITemplate, ITemplate>, void> {

  onOk () {
    (this.refs.form as any).validateFields((err, data) => {
      if (!err) {
        this.props.resolve(data)
      }
    })
  }

  render () {
    return (
      <main>
        <TemplateForm ref="form" data={this.props.data} />
        <CommonModalFooter onCancel={this.props.reject} onOk={this.onOk} />
      </main>
    )
  }
}

interface ITemplateFormProps extends FormComponentProps {
  data: ITemplate
}
const TemplateForm = Form.create()(((props: ITemplateFormProps) => {
  const isNew = !props.data

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 12
    }
  }
  const { getFieldDecorator: desc } = props.form
  return (
    <Form>
      <Form.Item {...formItemLayout} label={<FM id="common.message_type" />} >
        {desc("message_type", {
          initialValue: isNew ? "email" : props.data.message_type
        })(
         <Radio.Group>
            <Radio.Button value="email">Email</Radio.Button>
            <Radio.Button value="sms">SMS</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.render_type" />} >
        {desc("render_type", {
          initialValue: isNew ? "context" : props.data.render_type
        })(
         <Radio.Group>
            <Radio.Button value="context">Context</Radio.Button>
            <Radio.Button value="raw">Raw</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.from" />} >
        {desc("from", {
          initialValue: isNew ? "" : props.data.from,
          rules: [{required: true}]
        })(
          <Input type="textarea" placeholder="go template"/>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.to" />} >
        {desc("to", {
          initialValue: isNew ? "" : props.data.to,
          rules: [{required: true}]
        })(
          <Input type="textarea" placeholder="go template"/>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.subject" />} >
        {desc("subject", {
          initialValue: isNew ? "" : props.data.subject,
          rules: [{required: true}]
        })(
          <Input type="textarea" placeholder="go template"/>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.content" />} >
        {desc("content", {
          initialValue: isNew ? "" : props.data.content,
          rules: [{required: true}]
        })(
          <Input type="textarea" placeholder="go template"/>
        )}
      </Form.Item>
    </Form>
  )
}) as any) as any
