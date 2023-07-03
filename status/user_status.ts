import {badge as html_badge} from "../helpers/html";

export function user_status(status: string) {
  if ('pending' === status) {
    return html_badge('warning-dim text-warning', 'pending')
  }

  if ('active' === status) {
    return html_badge('success-dim text-success', 'active')
  }

  if ('inactive' === status) {
    return html_badge('danger-dim text-danger', 'inactive')
  }

  if ('rejected' === status) {
    return html_badge('danger', 'rejected')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
