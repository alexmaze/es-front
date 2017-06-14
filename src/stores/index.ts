import { SessionStore } from "./SessionStore"
import { ModalStore } from "./ModalStore"
import { LocaleStore } from "./LocaleStore"

export default {
  sessionStore: new SessionStore(),
  modalStore: new ModalStore(),
  localeStore: new LocaleStore()
}

// just for easy reference
export * from "./SessionStore"
export * from "./ModalStore"
export * from "./LocaleStore"
