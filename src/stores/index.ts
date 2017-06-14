import { SessionStore } from "./SessionStore"
import { ModalStore } from "./ModalStore"
import { LocaleStore } from "./LocaleStore"

export const sessionStore = new SessionStore()
export const modalStore = new ModalStore()
export const localeStore = new LocaleStore()

// just for easy reference
export * from "./SessionStore"
export * from "./ModalStore"
export * from "./LocaleStore"
