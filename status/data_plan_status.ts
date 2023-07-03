import {badge as html_badge} from "../helpers/html";

export function data_plan_status(status: string) {
  if ('active' === status) {
    return html_badge('success-dim text-success', 'active')
  }

  if ('inactive' === status) {
    return html_badge('danger-dim text-danger', 'inactive')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
