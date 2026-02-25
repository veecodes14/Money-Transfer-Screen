import { useState } from 'react'
import { ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useValidateAccount } from '../hooks/useValidateAccount'
import { BANKS } from '../utils/bankData'
import type { TransferFormData, DevFlags } from '../types/transfer'

interface TransferFormProps {
  dark: boolean
  devFlags?: DevFlags
  onContinue: (data: TransferFormData) => void
}

export function TransferForm({ dark, devFlags, onContinue }: TransferFormProps) {
  const [accountNumber, setAccountNumber] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [amount, setAmount] = useState('')
  const [narration, setNarration] = useState('')
  const [touched, setTouched] = useState({ amount: false, narration: false })

  const {
    accountName: realAccountName,
    isValidating: realIsValidating,
    isError: realIsError,
    validationError: realValidationError,
    isSuccess: realIsSuccess,
  } = useValidateAccount(accountNumber, bankCode)

  // Dev flag overrides
  const isValidating = devFlags?.validationLoading ? true : realIsValidating
  const isError = devFlags?.validationError ? true : realIsError
  const validationError = devFlags?.validationError
    ? new Error(devFlags.validationErrorMsg)
    : realValidationError
  const accountName = devFlags?.validationError ? null : realAccountName
  const isSuccess = devFlags?.validationError ? false : (devFlags?.validationLoading ? false : realIsSuccess)

  const selectedBank = BANKS.find((b) => b.code === bankCode)
  const amountNum = parseFloat(amount)
  const amountValid = !isNaN(amountNum) && amountNum > 0
  const canContinue =
    accountNumber.length === 10 &&
    bankCode !== '' &&
    amountValid &&
    isSuccess &&
    accountName !== null

  const label = dark ? 'text-slate-300' : 'text-primary-500'
  const input = dark
    ? 'bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500'
    : 'bg-white border-primary-200 text-brand-navy placeholder:text-primary-300 focus:border-brand-navy'
  const selectBg = dark ? 'bg-slate-700/60' : 'bg-white'

  function handleContinue() {
    if (!canContinue) return
    onContinue({
      accountNumber,
      bankCode,
      bankName: selectedBank?.name ?? bankCode,
      amount,
      narration,
      accountName: accountName!,
    })
  }

  return (
    <div className="space-y-5">
      {/* Account Number */}
      <div className="space-y-1.5">
        <label className={`block text-xs font-semibold uppercase tracking-wide ${label}`}>
          Recipient Account Number
        </label>
        <div className="relative">
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
            placeholder="0000000000"
            className={`w-full border rounded-xl px-4 py-3.5 text-base font-mono tracking-widest transition-all outline-none ${input}`}
          />
          {/* Inline validation indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {isValidating && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
            {!isValidating && isSuccess && accountName && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
            {!isValidating && isError && accountNumber.length === 10 && (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
        </div>
        {/* Account name reveal */}
        {isSuccess && accountName && (
          <div className="flex items-center gap-2 px-1 pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-emerald-500 tracking-wide">
              {accountName}
            </span>
          </div>
        )}
        {isError && accountNumber.length === 10 && (
          <p className="text-xs text-red-400 px-1 pt-0.5">
            {validationError?.message ?? 'Account not found'}
          </p>
        )}
      </div>

      {/* Bank Name */}
      <div className="space-y-1.5">
        <label className={`block text-xs font-semibold uppercase tracking-wide ${label}`}>
          Bank Name
        </label>
        <div className="relative">
          <select
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            className={`w-full appearance-none border rounded-xl px-4 py-3.5 text-base transition-all outline-none ${selectBg} ${input}`}
          >
            <option value="">Select bank…</option>
            {BANKS.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dark ? 'text-slate-400' : 'text-primary-400'}`}
          />
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <label className={`block text-xs font-semibold uppercase tracking-wide ${label}`}>
          Amount (GH₵)
        </label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, amount: true }))}
          placeholder="0.00"
          className={`w-full border rounded-xl px-4 py-3.5 text-base transition-all outline-none ${input}`}
        />
        {touched.amount && amount !== '' && !amountValid && (
          <p className="text-xs text-red-400 px-1">Amount must be greater than zero</p>
        )}
      </div>

      {/* Narration */}
      <div className="space-y-1.5">
        <label className={`block text-xs font-semibold uppercase tracking-wide ${label}`}>
          Narration{' '}
          <span className={`normal-case font-normal ${dark ? 'text-slate-500' : 'text-primary-300'}`}>
            (optional)
          </span>
        </label>
        <input
          type="text"
          maxLength={50}
          value={narration}
          onChange={(e) => setNarration(e.target.value.slice(0, 50))}
          placeholder="e.g. Rent, School fees…"
          className={`w-full border rounded-xl px-4 py-3.5 text-base transition-all outline-none ${input}`}
        />
        <p className={`text-xs text-right px-1 ${narration.length >= 50 ? 'text-red-400' : dark ? 'text-slate-500' : 'text-primary-400'}`}>
          {narration.length}/50
        </p>
      </div>

      {/* Continue */}
      <button
        type="button"
        disabled={!canContinue}
        onClick={handleContinue}
        style={canContinue ? { background: 'linear-gradient(135deg, #D4A843, #B08A2E)', color: '#001A3A' } : undefined}
        className="w-full mt-2 py-4 rounded-2xl font-bold text-base tracking-wide transition-all
          bg-primary-200 text-primary-700
          disabled:opacity-40 disabled:cursor-not-allowed
          active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  )
}
