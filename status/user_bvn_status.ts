import {badge as html_badge} from "../helpers/html";

export function user_bvn_status(status: string) {
  if ('approved' === status) {
    return html_badge('success-dim text-success', 'approved')
  }

  if ('pending' === status) {
    return html_badge('warning-dim text-warning', 'pending approval')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
