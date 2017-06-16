import * as React from "react"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { FormattedMessage as FM } from "react-intl"
import { Input, Form, Switch } from "antd"
import { FormComponentProps } from "antd/lib/form/Form"

import { IDomain } from "src/models"
import { ICommonModalProps } from "src/utils"
import { CommonModalFooter } from "src/components/common-modals/CommonModalFooter"
import { domainStore } from "src/stores"

@observer
@autobind
export class CreateDomainModal extends React.Component<ICommonModalProps<IDomain, IDomain>, {}> {

  @observable isSubmitting = false

  onOk() {
    (this.refs.form as any).validateFields(async (err: any, data: IDomain) => {
      if (!err) {
        this.isSubmitting = true
        if (this.props.data) {
          data = {...this.props.data, ...data}
          await domainStore.update(data)
        } else {
          await domainStore.create(data)
        }
        this.isSubmitting = false
        this.props.resolve(data)
      }
    })
  }

  render() {
    return (
      <main>
        <DomainForm ref="form" data={this.props.data} />
        <CommonModalFooter onCancel={this.props.reject} onOk={this.onOk} />
      </main>
    )
  }
}

interface IDomainFormProps extends FormComponentProps {
  data: IDomain
}

const DomainForm = Form.create()(((props: IDomainFormProps) => {
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
      <Form.Item {...formItemLayout} label={<FM id="common.name" />} >
        {desc("name", {
          initialValue: isNew ? "" : props.data.name,
          rules: [{ required: true }]
        })(
          <Input placeholder="domain name" />
          )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.enabled" />} >
        {desc("enabled", {
          initialValue: isNew ? false : props.data.enabled
        })(
          <Switch defaultChecked={isNew ? false : props.data.enabled} />
          )}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FM id="common.description" />} >
        {desc("description", {
          initialValue: isNew ? "" : props.data.description
        })(
          <Input type="textarea" placeholder="description" />
          )}
      </Form.Item>
    </Form>
  )
}) as any) as any
