import {badge as html_badge} from "../helpers/html";

export function van_request_status(status: string) {
  if ('pending' === status) {
    return html_badge('warning-dim text-warning', 'pending')
  }

  if ('approved' === status) {
    return html_badge('success-dim text-success', 'approved')
  }

  if ('rejected' === status) {
    return html_badge('danger-dim text-danger', 'rejected')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
