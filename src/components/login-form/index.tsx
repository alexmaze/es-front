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
class LoginForm_ extends React.Component<ILoginFormProps, void> {

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
        rules: [{ required: true, message: intl({id: errMessageId})}]
      }
    }

    return (
      <Form onSubmit={this.submit} className="login-form">
        <FormItem>
          {getFieldDecorator("username", getFormItemOptions("err.username.required"))(
            <Input onFocus={this.handleFocus} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={intl({id: "common.username"})} />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", getFormItemOptions("err.username.required"))(
            <Input onFocus={this.handleFocus} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={intl({id: "common.password"})} />
            )}
          {this.props.isError ? (<div className="login-form-error"> <FormattedMessage id="err.login.wrong" /> </div>) : (<div />)}
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

export const LoginForm = injectIntl(Form.create()(LoginForm_ as any) as any)
