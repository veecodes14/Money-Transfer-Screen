import { CheckCircle2, Copy } from 'lucide-react'
import { useState } from 'react'
import { formatAmount } from '../utils/bankData'
import type { TransferFormData, TransferResponse } from '../types/transfer'

interface SuccessScreenProps {
  result: TransferResponse
  formData: TransferFormData
  dark: boolean
  onNewTransfer: () => void
}

export function SuccessScreen({ result, formData, dark, onNewTransfer }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  function copyRef() {
    navigator.clipboard.writeText(result.reference).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const muted = dark ? 'text-slate-400' : 'text-primary-400'
  const card = dark ? 'bg-slate-700/50 border-slate-600' : 'bg-primary-50 border-primary-100'
  const divider = dark ? 'border-slate-700' : 'border-primary-100'

  return (
    <div className="flex flex-col items-center text-center py-4 space-y-6">
      {/* Animated check */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/25 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      <div>
        <h2 className={`text-2xl font-black mb-1 ${dark ? 'text-white' : 'text-brand-navy'}`}>
          Transfer Successful!
        </h2>
        <p className={`text-sm ${muted}`}>
          GH₵{formatAmount(formData.amount)} sent to {formData.accountName}
        </p>
      </div>

      {/* Reference */}
      <button
        type="button"
        onClick={copyRef}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${card} ${dark ? 'text-slate-300' : 'text-primary-600'}`}
      >
        <span className="text-sm font-mono font-semibold">{result.reference}</span>
        {copied ? (
          <span className="text-xs text-emerald-500 font-semibold">Copied!</span>
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>

      {/* Summary card */}
      <div className={`w-full rounded-2xl border overflow-hidden ${divider}`}>
        {[
          { label: 'Recipient', value: formData.accountName },
          { label: 'Account', value: formData.accountNumber },
          { label: 'Bank', value: formData.bankName },
          { label: 'Narration', value: formData.narration || '—' },
        ].map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between items-center px-4 py-3 text-left ${i > 0 ? `border-t ${divider}` : ''} ${dark ? 'bg-slate-700/30' : 'bg-primary-50'}`}
          >
            <span className={`text-xs ${muted}`}>{row.label}</span>
            <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-brand-navy'}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onNewTransfer}
        style={{ background: 'linear-gradient(135deg, #D4A843, #B08A2E)', color: '#001A3A' }}
        className="w-full py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all"
      >
        New Transfer
      </button>
    </div>
  )
}
