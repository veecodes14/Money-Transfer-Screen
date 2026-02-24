import type {
  ValidateAccountRequest,
  ValidateAccountResponse,
  TransferRequest,
  TransferResponse,
} from '../types/transfer'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Mock recipient names cycled by last digit of account number
const MOCK_NAMES = [
  'KWAME ASANTE',
  'CECILIA BAIDOO',
  'KWESI DADZIE',
  'ABENA MENSAH',
  'YAA BAMFO',
  'FATIMA AL-HASSAN',
  'EMMANUEL ADEYEMI',
  'AKOSUA AMPONSAH',
  'CHIMAMANDA ADICHIE',
  'JOHN OKONKWO',
]

export async function validateAccount(
  req: ValidateAccountRequest,
): Promise<ValidateAccountResponse> {
  await sleep(1000)

  if (req.accountNumber.length !== 10) {
    return Promise.reject(new Error('Account number must be exactly 10 digits'))
  }

  if (!req.bankCode) {
    return Promise.reject(new Error('Please select a bank'))
  }

  // Simulate occasional lookup failure
  if (Math.random() < 0.05) {
    return Promise.reject(new Error('Unable to reach bank — please retry'))
  }

  const index = parseInt(req.accountNumber[9], 10) % MOCK_NAMES.length
  return { accountName: MOCK_NAMES[index] }
}

export async function transfer(req: TransferRequest): Promise<TransferResponse> {
  await sleep(1500)

  if (req.amount <= 0) {
    return Promise.reject(new Error('Amount must be greater than zero'))
  }

  // Simulate occasional network failure
  if (Math.random() < 0.07) {
    return Promise.reject(new Error('Transaction failed. Please try again.'))
  }

  const reference = `TXN${Date.now().toString().slice(-7)}`
  return { status: 'success', reference }
}
