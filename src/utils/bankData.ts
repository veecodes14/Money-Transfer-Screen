import type { Bank, AppNotification } from '../types/transfer'

export const BANKS: Bank[] = [
  { name: 'Access Bank', code: 'ACCESS' },
  { name: 'Ecobank', code: 'ECO' },
  { name: 'Fidelity Bank', code: 'FIDELITY' },
  { name: 'First Bank of Ghana', code: 'FBN' },
  { name: 'GTBank', code: 'GTB' },
  { name: 'Sterling Bank', code: 'STERLING' },
  { name: 'UBA', code: 'UBA' },
  { name: 'Zenith Bank', code: 'ZENITH' },
  { name: 'GCB Bank', code: 'GCB' },
  { name: 'Absa Bank', code: 'ABSA' },
  { name: 'Stanbic Bank', code: 'STANBIC' },
  { name: 'Standard Chartered', code: 'SCB' },
]

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Transfer Successful',
    message: 'You sent ₵50,000 to Kwame Asante. Ref: TXN829282',
    time: '2 mins ago',
    read: false,
    type: 'debit',
  },
  {
    id: '2',
    title: 'Credit Alert',
    message: 'Your account has been credited with ₵200,000.',
    time: '1 hour ago',
    read: false,
    type: 'credit',
  },
  {
    id: '3',
    title: 'Login Detected',
    message: 'New login from Chrome on macOS at 10:32 AM.',
    time: '3 hours ago',
    read: true,
    type: 'alert',
  },
  {
    id: '4',
    title: 'Statement Ready',
    message: 'Your January 2026 account statement is available.',
    time: 'Yesterday',
    read: true,
    type: 'info',
  },
  {
    id: '5',
    title: 'Transfer Successful',
    message: 'You sent ₵10,500 to Emeka Okafor. Ref: TXN712344',
    time: '2 days ago',
    read: true,
    type: 'debit',
  },
  {
    id: '6',
    title: 'Low Balance Alert',
    message: 'Your account balance is below ₵5,000.',
    time: '3 days ago',
    read: true,
    type: 'alert',
  },
]

export function formatAmount(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
