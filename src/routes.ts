import { RouteConfig } from "react-router-config"
import { Skeleton } from "./components/skeleton"
import { KeystonePage } from "./pages/keystone"

export const routesConfig = [
  {
    path: "/",
    component: Skeleton,
    routes: [
      {
        path: "/keystone",
        component: KeystonePage
      }
    ]
  }
] as RouteConfig[]
