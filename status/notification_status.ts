import {badge as html_badge} from "../helpers/html";

export function notification_status(status: string) {
  if ('pending' === status) {
    return '<span class="text-success fw-bold">new</span>'
  }

  return ''
}
