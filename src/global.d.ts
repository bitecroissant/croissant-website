const isDev: boolean

type JSONValue = string | name | boolean | null | { [k: string ]: JSONValue } | JSONValue[]
interface Resource<T> {
  resource: T
}

interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

interface Event {
  id: string
  gmt_create: string
  gmt_modified: string
  delete_flag: number
  active_status: string
  name: string
  is_loop: number
  is_pin: number
  creator: string
  emoji?: string
  icon_name?: string
  icon_color?: string
}
