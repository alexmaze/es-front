import { observable, action } from "mobx"
import { IDomain } from "src/models"

export class DomainStore {
  @observable isFetching = false
  @observable domains: IDomain[]

  @action async fetchDomains() {
    this.isFetching = true
    // todo
    this.isFetching = false
    return this.domains
  }

  @action async create(domain: IDomain) {
    // todo
  }

  @action async update(domain: IDomain) {
    // todo
  }

  @action async delete(id: string) {
    // todo
  }

}

export const domainStore = new DomainStore()
