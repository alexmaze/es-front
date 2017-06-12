import "./style.less"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { RouteComponentProps } from "react-router-dom"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { sessionStore } from "src/stores"
import { autobind } from "core-decorators"

import { Table, Button, Pagination, Input, Modal } from "antd"
import { ModalProps } from "antd/lib/modal/Modal.d"
const Search = Input.Search

import { CreateAppModal } from "./modals/create-app"
import { FormattedMessage } from "react-intl"

@observer
@autobind
export class AppsPage extends React.Component<RouteComponentProps<void>, void> {
  @observable isLoading: boolean = false
  @observable sortedInfo: any = {}

  constructor() {
    super()
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }

  handleChange (pagination, filters, sorter) {
    this.sortedInfo = sorter
  }

  onCreate () {
    CreateAppModal.show().then((ret) => {
      console.debug("modal success", ret)
    }, (err) => {
      console.debug("modal fail", err)
    })
  }

  onEdit () {
    console.debug("edit app")
  }

  onSearch (key: string) {
    console.debug("on search", key)
  }

  onSelectChange (e) {
    console.debug("on select change", e)
  }

  onSelection (e) {
    console.debug("on selection", e)
  }

  render () {
    const columns = [{
      title: "ID",
      key: "id",
      sorter: (a, b) => a.id > b.id ? 1 : -1,
      sortOrder: this.sortedInfo.columnKey === "id" && this.sortedInfo.order
    }, {
      title: "Name",
      key: "name",
      sorter: (a, b) => a.name > b.name ? 1 : -1,
      sortOrder: this.sortedInfo.columnKey === "name" && this.sortedInfo.order
    }, {
      title: "Status",
      key: "status",
      sorter: (a, b) => a.status > b.status ? 1 : -1,
      sortOrder: this.sortedInfo.columnKey === "status" && this.sortedInfo.order
    }, {
      title: "Created At",
      key: "ctime",
      sorter: (a, b) => a.ctime > b.ctime ? 1 : -1,
      sortOrder: this.sortedInfo.columnKey === "ctime" && this.sortedInfo.order
    }]
    const rowSelection = {
      selectedRowKeys: ["id"],
      onChange: this.onSelectChange,
      onSelection: this.onSelection
    }
    return (
      <div className="apps-page">
        <div className="table-operations">
          <Button type="primary" onClick={this.onCreate}>Create</Button>
          <Button onClick={this.onEdit}>Edit</Button>
          <Search onSearch={this.onSearch} placeholder="ID / Name" style={{width: 200, float: "right"}}/>
        </div>
        <Table rowSelection={rowSelection} bordered={true} loading={this.isLoading} columns={columns}/>
      </div>
    )
  }
}
