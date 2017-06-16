import { observable, action } from "mobx"
import { IDomain } from "src/models"

export class DomainStore {
  @observable isFetching = false
  @observable domains: IDomain[] = []

  @action async fetchDomains() {
    this.isFetching = true
    // todo
    this.isFetching = false
    return this.domains
  }

  @action async create(domain: IDomain) {
    // todo
    domain.id = Date.now().toString()
    this.domains.push(domain)
  }

  @action async update(domain: IDomain) {
    // todo
    let index
    for (let i = 0; i < this.domains.length; i++) {
      if (this.domains[i].id === domain.id) {
        index = i
        break
      }
    }
    if (index != null) {
      this.domains[index] = {...this.domains[index], ...domain}
    }
  }

  @action async delete(id: string) {
    // todo
    const selected = this.domains.find(item => item.id === id)
    this.domains.splice(this.domains.indexOf(selected), 1)
  }

}

export const domainStore = new DomainStore()
