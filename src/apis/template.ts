import axios from "axios"
import { API_PREFIX } from "./config"
import { ITemplate, IResponse } from "src/models"
import { BasicRestfulResource } from "src/apis"

class _TemplateAPI extends BasicRestfulResource<ITemplate> {
  constructor() {
    super(`${API_PREFIX}/template`)
  }
}

export const TemplateAPI = new _TemplateAPI()
