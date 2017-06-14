import * as React from "react"
import { RouteConfig } from "react-router-config"
import PortalSkeleton from "./components/portal-skeleton"

const Temp = () => (
  <div>Temp</div>
)

export const routesConfig = [
  {
    path: "/",
    component: PortalSkeleton,
    routes: [
      {
        path: "/dashboard",
        component: Temp
      }, {
        path: "/about",
        component: Temp
      }, {
        path: "/timer",
        component: Temp
      }, {
        exact: true,
        path: "/pods",
        component: Temp
      }, {
        path: "/namespaces/:namespace/pods/:podName",
        component: Temp
      }, {
        exact: true,
        path: "/teams",
        component: Temp
      }, {
        path: "/teams/:name",
        component: Temp
      }, {
        exact: true,
        path: "/nodes",
        component: Temp
      }
    ]
  }
] as RouteConfig[]
