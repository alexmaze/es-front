import { sessionStore } from "./SessionStore"
import { modalStore } from "./ModalStore"
import { localeStore } from "./LocaleStore"
import { routeStore } from "./RouteStore"
import { domainStore } from "./DomainStore"

export default {
  sessionStore,
  modalStore,
  localeStore,
  routeStore,
  domainStore
}

// just for easy reference
export * from "./SessionStore"
export * from "./ModalStore"
export * from "./LocaleStore"
export * from "./RouteStore"
export * from "./DomainStore"
