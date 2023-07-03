import {badge as html_badge} from "../helpers/html";

export function auth_attempt_status(status: string) {
  if ('success' === status) {
    return html_badge('success-dim text-success', 'success')
  }

  if ('failure' === status) {
    return html_badge('danger-dim text-danger', 'failure')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
