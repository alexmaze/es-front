/// <reference path="./index.d.ts" />
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import "./index.less"

render()

function render () {
  ReactDOM.render(<App />, document.getElementById("root"))
}

// Hot Module Replacement API
declare var module: { hot: any }
if (module && module.hot) {
  module.hot.accept("./App", () => {
    render()
  })
}
