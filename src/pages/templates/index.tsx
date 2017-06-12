import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import { autobind } from "core-decorators"
import { Table, Button, Pagination, Input, Modal } from "antd"
import { ModalProps } from "antd/lib/modal/Modal.d"
import { FormattedMessage as FM } from "react-intl"

import { TemplateAPI } from "src/apis"
import { ITemplate } from "src/models"
import { formatDate, searchObject, ModalFactory } from "src/utils"
import { CreateTemplateModal } from "./modals/create-template"
import { localeStore } from "src/stores"

class TemplateTable extends Table<ITemplate> {}

@observer
@autobind
export class TemplatesPage extends React.Component<RouteComponentProps<void>, void> {
  @observable isLoading: boolean = false
  @observable sortedInfo: any = {}
  @observable data: ITemplate[]
  @observable selectedIds: string[] = []
  @observable searchKey: string = ""

  constructor() {
    super()
    this.loadData()
  }

  async loadData() {
    this.isLoading = true

    try {
      const data = (await TemplateAPI.all()).data
      this.data = data ? data : []
    } catch (e) { console.error(e) }

    this.isLoading = false
  }

  @computed get showData () {
    return this.data ? this.data.filter((item) => searchObject(item, this.searchKey)) : []
  }

  async onCreate () {
    const something = <FM id="common.template" values={{ count: "1" }} />
    const title = <FM id="common.create_sth" values={{ something }}/>

    try {
      let data = await ModalFactory.create<ITemplate, ITemplate>({ title }, CreateTemplateModal)
      data = (await TemplateAPI.create(data)).data
      this.data.push(data)
    } catch (e) {
    }
  }

  async onEdit () {
    const something = <FM id="common.template" values={{ count: "1" }} />
    const title = <FM id="common.edit_sth" values={{ something }}/>

    const selectedItem = this.data.find((item) => item.id === this.selectedIds[0])
    try {
      let data = await ModalFactory.create<ITemplate, ITemplate>({ title }, CreateTemplateModal, selectedItem)
      data = (await TemplateAPI.update(selectedItem.id, data)).data
      Object.assign(selectedItem, data)
      this.data = [...this.data] // force mobx to rerender
    } catch (e) {
    }
  }

  onDelete () {
    const textLowercase = {
      textTransform: "lowercase"
    }
    const something = <span style={textLowercase}><FM id="common.template" values={{ count: "1" }} /></span>
    const title = <FM id="common.delete_warning" />
    const content = <FM id="common.delete_warning_msg" values={{ something }} />

    const selectedItem = this.data.find((item) => item.id === this.selectedIds[0])
    ModalFactory.confirm({
      title,
      content
    }).then(() => {
      return TemplateAPI.delete(selectedItem.id)
    }).then(() => {
      this.data.splice(this.data.indexOf(selectedItem), 1)
    }).catch((err) => {
    })
  }

  onSearch (e: React.ChangeEvent<HTMLInputElement>) {
    this.searchKey = e.target.value
  }

  render () {
    const columns = [{
      title: <FM id="common.id" />,
      dataIndex: "id",
      render: (text: string) => text.substr(0, 6)
    }, {
      title: <FM id="common.subject" />,
      dataIndex: "subject"
    }, {
      title: <FM id="common.message_type" />,
      dataIndex: "message_type"
    }, {
      title: <FM id="common.render_type" />,
      dataIndex: "render_type"
    }, {
      title: <FM id="common.created_at" />,
      dataIndex: "created_at",
      render: (text) => formatDate(text)
    }]
    const tableConfig = {
      rowSelection: {
        selectedRowKeys: this.selectedIds,
        onChange: (selectedIds) => this.selectedIds = selectedIds
      },
      rowKey: "id",
      dataSource: this.showData,
      bordered: true,
      loading: this.isLoading,
      columns,
      pagination: {
        total: this.showData.length,
        pageSize: 10,
        simple: true
      }
    }
    return (
      <div className="apps-page">
        <div className="table-operations">
          <Button type="primary" onClick={this.onCreate}><FM id="common.create" /></Button>
          <Button onClick={this.onEdit} disabled={this.selectedIds.length !== 1}><FM id="common.edit" /></Button>
          <Button onClick={this.onDelete} disabled={this.selectedIds.length !== 1}><FM id="common.delete" /></Button>
          <Input.Search onChange={this.onSearch} placeholder={localeStore.messages["common.search"]} style={{width: 200, float: "right"}}/>
        </div>
        <TemplateTable {...tableConfig} />
      </div>
    )
  }
}
