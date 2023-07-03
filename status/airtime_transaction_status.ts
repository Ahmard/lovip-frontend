import {badge as html_badge} from "../helpers/html";

export function airtime_transaction_status(status: string) {
  if ('processed' === status) {
    return html_badge('success-dim text-success', 'processed')
  }

  if ('processing' === status) {
    return html_badge('danger-dim text-info', 'processing')
  }

  if ('reprocessing_requested' === status) {
    return html_badge('danger-dim text-warning', 'requested reprocessing')
  }

  if ('failed' === status) {
    return html_badge('danger-dim text-danger', 'failed')
  }

  if ('canceled' === status) {
    return html_badge('danger-dim text-danger', 'canceled')
  }

  return html_badge('danger-dim text-danger', `unknown(${status})`)
}
