import * as React from "react"
import styled from "styled-components"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable, computed } from "mobx"
import { FormattedMessage as FM } from "react-intl"
import { searchObject } from "src/utils"
import { Table, Button, Input } from "antd"

import { localeStore } from "src/stores"
import { IDomain } from "src/models"

class DomainTable extends Table<IDomain> {}

@observer
@autobind
export class DomainTab extends React.Component<{}, {}> {
  @observable isLoading = false
  @observable data: IDomain[]
  @observable searchKey = ""
  @observable selectedIds: string[] = []

  @computed get showData () {
    return this.data ? this.data.filter((item) => searchObject(item, this.searchKey)) : []
  }

  async onCreate () {
    // const something = <FM id="common.template" values={{ count: "1" }} />
    // const title = <FM id="common.create_sth" values={{ something }}/>

    // try {
    //   let data = await ModalFactory.create<ITemplate, ITemplate>({ title }, CreateTemplateModal)
    //   data = (await TemplateAPI.create(data)).data
    //   this.data.push(data)
    // } catch (e) {
    // }
  }

  async onEdit () {
    // const something = <FM id="common.template" values={{ count: "1" }} />
    // const title = <FM id="common.edit_sth" values={{ something }}/>

    // const selectedItem = this.data.find((item) => item.id === this.selectedIds[0])
    // try {
    //   let data = await ModalFactory.create<ITemplate, ITemplate>({ title }, CreateTemplateModal, selectedItem)
    //   data = (await TemplateAPI.update(selectedItem.id, data)).data
    //   Object.assign(selectedItem, data)
    //   this.data = [...this.data] // force mobx to rerender
    // } catch (e) {
    // }
  }

  onDelete () {
    // const textLowercase = {
    //   textTransform: "lowercase"
    // }
    // const something = <span style={textLowercase}><FM id="common.template" values={{ count: "1" }} /></span>
    // const title = <FM id="common.delete_warning" />
    // const content = <FM id="common.delete_warning_msg" values={{ something }} />

    // const selectedItem = this.data.find((item) => item.id === this.selectedIds[0])
    // ModalFactory.confirm({
    //   title,
    //   content
    // }).then(() => {
    //   return TemplateAPI.delete(selectedItem.id)
    // }).then(() => {
    //   this.data.splice(this.data.indexOf(selectedItem), 1)
    // }).catch((err) => {
    // })
  }

  onSearch (e: React.ChangeEvent<HTMLInputElement>) {
    this.searchKey = e.target.value
  }

  render() {
    const columns = [{
      title: <FM id="common.id" />,
      dataIndex: "id",
      render: (text: string) => text.substr(0, 6)
    }, {
      title: <FM id="common.name" />,
      dataIndex: "name"
    }, {
      title: <FM id="common.enabled" />,
      dataIndex: "enabled"
    }, {
      title: <FM id="common.description" />,
      dataIndex: "description"
    }]
    const tableConfig = {
      rowSelection: {
        selectedRowKeys: this.selectedIds,
        onChange: (selectedIds: string[]) => this.selectedIds = selectedIds
      },
      rowKey: "id",
      dataSource: this.showData,
      bordered: true,
      loading: this.isLoading,
      columns
    }
    return (
      <div>
        <TableActionBar>
          <Button type="primary" onClick={this.onCreate}>
            <FM id="common.create" />
          </Button>
          <Button onClick={this.onEdit} disabled={this.selectedIds.length !== 1}>
            <FM id="common.edit" />
          </Button>
          <Button type="danger" onClick={this.onDelete} disabled={this.selectedIds.length !== 1}>
            <FM id="common.delete" />
          </Button>
          <Input.Search
            onChange={this.onSearch}
            placeholder={localeStore.messages["common.search"]}
            style={{width: 200, float: "right"}}/>
        </TableActionBar>
        <DomainTable {...tableConfig} />
      </div>
    )
  }
}

const TableActionBar = styled.div`
  margin: 0 0 10px 0;
  button + button {
    margin-left: 10px;
  }
`
