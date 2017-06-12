export interface IResponse<T> {
  code: string
  message: string
  resource: string
  request_id: string
  data: T
}

export interface ISession {
  id: string
  name: string
}

export interface IApp {
  id: string
  name: string
}

export type MessageType = "email" | "sms"
export type RenderType = "raw" | "context"

export interface ITemplate {
  id: string
  from: string
  to: string
  subject: string
  content: string
  message_type: MessageType
  render_type: RenderType
  created_at: string
  updated_at: string
}
