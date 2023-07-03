import {badge as html_badge} from "../helpers/html";

export function payment_status(status: string) {
  if ('pending' === status) {
    return html_badge('warning-dim text-warning', 'pending')
  }

  if ('paid' === status) {
    return html_badge('success-dim text-success', 'paid')
  }

  if ('canceled' === status) {
    return html_badge('danger-dim text-danger', 'canceled')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
