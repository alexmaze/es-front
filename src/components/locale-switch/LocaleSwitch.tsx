import * as React from "react"
import { autobind } from "core-decorators"
import { localeStore } from "src/stores"
import { Radio } from "antd"
import { observer } from "mobx-react"
import { History } from "history"

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

interface IProps {
  history: History
}

@observer
@autobind
export class LocaleSwitch extends React.Component<IProps, void> {

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    localeStore.switch(e.target.value)
  }

  render() {
    const buttonStyle = {
      border: "none",
      boxShadow: "none",
      padding: "0 5px",
      background: "transparent"
    }
    return (
      <RadioGroup style={{margin: "0 10px"}} value={localeStore.config.locale} onChange={this.handleChange}>
        {localeStore.languages.map(lang => (
          <RadioButton style={buttonStyle} value={lang.value}>{lang.title}</RadioButton>
        ))}
      </RadioGroup>
    )
  }
}
