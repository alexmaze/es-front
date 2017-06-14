import createBrowserHistory from "history/createBrowserHistory"

export class RouteStore {
  history = createBrowserHistory()
}

export const routeStore = new RouteStore()
