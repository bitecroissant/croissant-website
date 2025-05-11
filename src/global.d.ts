const isDev: boolean

type JSONValue = string | name | boolean | null | { [k: string ]: JSONValue } | JSONValue[]
interface Resource<T> {
  resource: T
}

interface Resources<T> {
  resources: T[]
  pager: {
    page_no: number
    per_page: number
    total: number
  }
}

interface Event {
  id: string
  gmt_create: string
  gmt_modified: string
  delete_flag: number
  is_active: number
  name: string
  is_loop: number
  is_pin: number
  creator: string
  emoji?: string
  icon_name?: string
  icon_color?: string
}

interface EventDate {
  id: string
  gmt_create: string
  gmt_modified: string
  delete_flag: number
  is_active: boolean
  creator: string
  events_id: string
  happen_at: string
  // event, solarTerm, holiday
  type: string
}

interface EventWithDates {
  events: Event
  event_dates: EventDate
}

interface SolarTerm {
  id: string
  gmt_create: string
  gmt_modified: string
  delete_flag: number
  creator: string
  index: number
  name: string
  en_name: string
  emoji: string
  meaning: string
  meteorological_changes: string
  related_verses: string
  custom: string
  recommended_foods: string
  addition: string
}

interface SolartTermWithDates {
  solar_terms: SolarTerm
  event_dates: EventDate
}
