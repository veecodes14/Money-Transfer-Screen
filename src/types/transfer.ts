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
