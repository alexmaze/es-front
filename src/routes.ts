import { RouteConfig } from "react-router-config"
import PortalSkeleton from "./components/portal-skeleton"
import { KeystonePage } from "./pages/keystone"

export const routesConfig = [
  {
    path: "/",
    component: PortalSkeleton,
    routes: [
      {
        path: "/keystone",
        component: KeystonePage
      }
    ]
  }
] as RouteConfig[]
