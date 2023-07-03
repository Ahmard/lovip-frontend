export interface AppSetting {
  airtime_txn_waived_percent: number
  moniepoint_card_charges: number
  moniepoint_transfer_charges: number
  moniepoint_vat: number
  payment_gateway: PaymentGateways
}

export enum PaymentGateways {
  MONIEPOINT = 'moniepoint',
  PAYSTACK = 'paystack',
  SQUAD = 'squad'
}
