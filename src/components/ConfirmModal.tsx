import { AlertTriangle } from 'lucide-react'
import { Spinner } from './Spinner'
import { formatAmount } from '../utils/bankData'
import type { TransferFormData } from '../types/transfer'

interface ConfirmModalProps {
  data: TransferFormData
  dark: boolean
  isPending: boolean
  isError: boolean
  error: Error | null
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  data,
  dark,
  isPending,
  isError,
  error,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const overlay = 'fixed inset-0 z-50 flex items-end sm:items-center justify-center'
  const backdrop = 'absolute inset-0 bg-black/60 backdrop-blur-sm'
  const sheet = dark
    ? 'relative bg-slate-800 border border-slate-700 text-white'
    : 'relative bg-white border border-primary-100 text-brand-navy'
  const muted = dark ? 'text-slate-400' : 'text-primary-400'
  const divider = dark ? 'border-slate-700' : 'border-primary-100'
  const rowLabel = dark ? 'text-slate-400 text-xs' : 'text-primary-400 text-xs'
  const rowValue = dark ? 'text-white font-medium text-sm' : 'text-brand-navy font-medium text-sm'

  return (
    <div className={overlay}>
      {/* Backdrop */}
      <div className={backdrop} onClick={onCancel} />

      {/* Sheet */}
      <div className={`${sheet} w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 z-10`}>
        {/* Handle bar (mobile) */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-gray-300 mx-auto mb-5" />

        <h2 className="text-lg font-bold mb-1">Confirm Transfer</h2>
        <p className={`text-sm mb-5 ${muted}`}>
          Review the details below before sending.
        </p>

        {/* Amount hero */}
        <div className="flex items-center justify-center py-4 mb-4">
          <span className={`text-4xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
            ₵{formatAmount(data.amount)}
          </span>
        </div>

        {/* Details list */}
        <div className={`rounded-2xl border ${divider} overflow-hidden mb-5`}>
          {[
            { label: 'Recipient', value: data.accountName },
            { label: 'Account Number', value: data.accountNumber },
            { label: 'Bank', value: data.bankName },
            { label: 'Narration', value: data.narration || '—' },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center px-4 py-3 ${i > 0 ? `border-t ${divider}` : ''} ${dark ? 'bg-slate-700/40' : 'bg-primary-50'}`}
            >
              <span className={rowLabel}>{row.label}</span>
              <span className={rowValue}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className={`flex gap-2 items-start rounded-xl px-3 py-2.5 mb-5 ${dark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p className="text-xs leading-snug">
            Transfers cannot be reversed once confirmed. Verify all details carefully.
          </p>
        </div>

        {isError && (
          <p className="text-sm text-red-400 text-center mb-4">
            {error?.message ?? 'Transfer failed. Please try again.'}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all disabled:opacity-40
              ${dark ? 'bg-slate-700 text-white' : 'bg-primary-50 text-brand-navy border border-primary-200'}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            style={{ background: isPending ? undefined : 'linear-gradient(135deg, #D4A843, #B08A2E)', color: '#001A3A' }}
            className="flex-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl
              font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed
              active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Spinner size="sm" />
                <span>Sending…</span>
              </>
            ) : (
              'Send Money'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
