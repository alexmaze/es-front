import { sessionStore } from "./SessionStore"
import { modalStore } from "./ModalStore"
import { localeStore } from "./LocaleStore"
import { routeStore } from "./RouteStore"

export default {
  sessionStore,
  modalStore,
  localeStore,
  routeStore
}

// just for easy reference
export * from "./SessionStore"
export * from "./ModalStore"
export * from "./LocaleStore"
export * from "./RouteStore"
