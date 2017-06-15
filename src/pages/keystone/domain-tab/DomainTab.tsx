import * as React from "react"
import styled from "styled-components"
import { autobind } from "core-decorators"
import { observer } from "mobx-react"
import { observable, computed } from "mobx"
import { FormattedMessage as FM } from "react-intl"
import { searchObject, ModalFactory } from "src/utils"
import { Table, Button, Input } from "antd"

import { localeStore, domainStore } from "src/stores"
import { IDomain } from "src/models"

import { CreateDomainModal } from "./CreateDomainModal"

class DomainTable extends Table<IDomain> {}

@observer
@autobind
export class DomainTab extends React.Component<{}, {}> {
  @observable searchKey = ""
  @observable selectedIds: string[] = []

  @computed get showData () {
    const data = domainStore.domains
    return data ? data.filter((item) => searchObject(item, this.searchKey)) : []
  }

  @computed selectedItem () {
    if (this.selectedIds.length !== 1) {
      return null
    }
    return this.showData.find((item) => item.id === this.selectedIds[0])
  }

  async onCreate () {
    const something = <FM id="domain" />
    const title = <FM id="common.create_sth" values={{ something }}/>

    try {
      await ModalFactory.create<IDomain, IDomain>({ title }, CreateDomainModal)
    } catch (e) {
      // todo
    }
  }

  async onEdit () {
    const something = <FM id="domain" />
    const title = <FM id="common.edit_sth" values={{ something }}/>

    try {
      await ModalFactory.create<IDomain, IDomain>({ title }, CreateDomainModal, this.selectedItem())
    } catch (e) {
      // todo
    }
  }

  onDelete () {
    const textLowercase = {
      textTransform: "lowercase"
    }
    const something = <span style={textLowercase}><FM id="domain" /></span>
    const title = <FM id="common.delete_warning" />
    const content = <FM id="common.delete_warning_msg" values={{ something }} />

    ModalFactory.confirm({
      title,
      content
    }).then(() => {
      return domainStore.delete(this.selectedItem().id)
    }).catch((err) => {
      // todo
    })
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
      loading: domainStore.isFetching,
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
