/// <reference path="./index.d.ts" />

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import stores from "./stores"
import "./index.less"

import { App } from "./App"

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>
  , document.getElementById("root"))

// Hot Module Replacement API
declare var module: { hot: any }
if (module && module.hot) {
  module.hot.accept("./App", () => {
    ReactDOM.render(
      <Provider {...stores}>
        <App />
      </Provider>
      , document.getElementById("root"))
  })
}
