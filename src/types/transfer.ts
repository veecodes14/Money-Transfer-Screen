export type Bank = {
  name: string
  code: string
}

export type ValidateAccountRequest = {
  accountNumber: string
  bankCode: string
}

export type ValidateAccountResponse = {
  accountName: string
}

export type TransferRequest = {
  recipientAccount: string
  bankCode: string
  amount: number
  narration: string
}

export type TransferResponse = {
  status: string
  reference: string
}

export type TransferFormData = {
  accountNumber: string
  bankCode: string
  bankName: string
  amount: string
  narration: string
  accountName: string
}

export type AppNotification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'credit' | 'debit' | 'info' | 'alert'
}

export type DevFlags = {
  validationLoading: boolean
  validationError: boolean
  validationErrorMsg: string
  transferLoading: boolean
  transferError: boolean
  transferErrorMsg: string
  showSuccess: boolean
}

export const DEFAULT_DEV_FLAGS: DevFlags = {
  validationLoading: false,
  validationError: false,
  validationErrorMsg: 'Account not found',
  transferLoading: false,
  transferError: false,
  transferErrorMsg: 'Transaction failed. Please try again.',
  showSuccess: false,
}
