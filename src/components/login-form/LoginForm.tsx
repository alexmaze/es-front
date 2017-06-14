import "./style.less"

import * as React from "react"
import { autobind } from "core-decorators"
import { FormattedMessage } from "react-intl"
import { ILoginParams } from "src/apis"

import { Button, Input, Form, Icon, Checkbox } from "antd"
import { FormComponentProps } from "antd/lib/form/Form"
const FormItem = Form.Item

import { injectIntl, InjectedIntl } from "react-intl"

export interface ILoginFormProps extends FormComponentProps {
  onSubmit: (params: ILoginParams) => void
  handleFocus: () => void
  isLogining: boolean
  isError: boolean

  intl: InjectedIntl
}

@autobind
class LoginForm extends React.Component<ILoginFormProps, void> {

  constructor() {
    super()
  }

  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  handleFocus() {
    this.props.handleFocus()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const intl = this.props.intl.formatMessage
    const getFormItemOptions = (errMessageId: string) => {
      return {
        rules: [{ required: true, message: intl({ id: errMessageId }) }]
      }
    }
    const inputProps = (icon: string, placeholderId: string) => {
      return {
        onFocus: this.handleFocus,
        prefix: <Icon type={icon} style={{ fontSize: 13 }} />,
        placeholder: intl({ id: placeholderId })
      }
    }

    const displayError = () => {
      if (this.props.isError) {
        return <div className="login-form-error"> <FormattedMessage id="err.login.wrong" /> </div>
      }
      return null
    }

    return (

      <Form onSubmit={this.submit} className="login-form">
        <FormItem>
          {getFieldDecorator("username", getFormItemOptions("err.username.required"))(
            <Input {...inputProps("user", "common.username")} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", getFormItemOptions("err.username.required"))(
            <Input {...inputProps("lock", "common.password")} type="password" />
          )}
          {displayError()}
        </FormItem>
        <FormItem>
          {getFieldDecorator("remember")(
            <Checkbox><FormattedMessage id="common.rememberme" /></Checkbox>
          )}
          <a className="login-form-forgot"><FormattedMessage id="common.forgotpass" /></a>
          <Button loading={this.props.isLogining} type="primary" htmlType="submit" className="login-form-button">
            <FormattedMessage id="common.login" />
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default injectIntl(Form.create()(LoginForm as any) as any)
