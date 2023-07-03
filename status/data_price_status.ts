import {badge as html_badge} from "../helpers/html";

export function data_price_status(status: string) {
  if ('active' === status) {
    return html_badge('success-dim text-success', 'active')
  }

  if ('old' === status) {
    return html_badge('danger-dim text-danger', 'old')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
