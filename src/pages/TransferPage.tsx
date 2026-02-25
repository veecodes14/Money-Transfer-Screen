import { useState, useEffect } from 'react'
import { Wallet, Eye, EyeOff } from 'lucide-react'
import { TransferForm } from '../components/TransferForm'
import { ConfirmModal } from '../components/ConfirmModal'
import { SuccessScreen } from '../components/SuccessScreen'
import { NotificationsTab } from '../components/NotificationsTab'
import { SettingsTab } from '../components/SettingsTab'
import { BottomNav, type Tab } from '../components/BottomNav'
import { useTransfer } from '../hooks/useTransfer'
import type { TransferFormData } from '../types/transfer'

type Step = 'form' | 'confirm' | 'success'

const DARK_KEY = 'secondbank_dark'

export function TransferPage() {
  const [tab, setTab] = useState<Tab>('transfer')
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(DARK_KEY)
      return saved !== null ? saved === 'true' : false // default light
    } catch {
      return false
    }
  })
  const [step, setStep] = useState<Step>('form')
  const [pendingData, setPendingData] = useState<TransferFormData | null>(null)
  const [balance, setBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('secondbank_balance')
      return saved !== null ? parseFloat(saved) : 248300.00
    } catch {
      return 248300.00
    }
  })
  const [balanceHidden, setBalanceHidden] = useState(false)

  const {
    mutate: doTransfer,
    isPending,
    isError,
    isSuccess,
    error,
    data: transferResult,
    reset,
  } = useTransfer()

  // Persist dark mode
  useEffect(() => {
    try {
      localStorage.setItem(DARK_KEY, String(dark))
    } catch {}
  }, [dark])

  // Persist balance
  useEffect(() => {
    try {
      localStorage.setItem('secondbank_balance', String(balance))
    } catch {}
  }, [balance])

  // Advance to success screen when transfer completes
  useEffect(() => {
    if (isSuccess && pendingData) {
      setBalance((prev) => prev - parseFloat(pendingData.amount))
      setStep('success')
    }
  }, [isSuccess])

  function handleContinue(data: TransferFormData) {
    setPendingData(data)
    reset() // clear any previous error
    setStep('confirm')
  }

  function handleConfirm() {
    if (!pendingData || isPending) return
    if (parseFloat(pendingData.amount) > balance) return
    doTransfer({
      recipientAccount: pendingData.accountNumber,
      bankCode: pendingData.bankCode,
      amount: parseFloat(pendingData.amount),
      narration: pendingData.narration,
    })
  }

  function handleCancel() {
    if (isPending) return // Don't dismiss mid-flight
    setStep('form')
    reset()
  }

  function handleNewTransfer() {
    setStep('form')
    setPendingData(null)
    reset()
  }

  //  Theming 
  const bg = dark ? 'bg-slate-900' : 'bg-primary-50'
  const surface = dark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-primary-100'
  const heading = dark ? 'text-white' : 'text-brand-navy'
  const subheading = dark ? 'text-slate-400' : 'text-primary-400'

  // Tab title map
  const tabTitles: Record<Tab, string> = {
    transfer: 'Send Money',
    notifications: 'Notifications',
    settings: 'Settings',
  }

  const tabSubtitles: Record<Tab, string> = {
    transfer: 'Fast, secure transfers in seconds',
    notifications: 'Your recent account activity',
    settings: 'Account and app preferences',
  }

  return (
    <div className={`min-h-dvh ${bg} flex flex-col`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-30 border-b ${dark ? 'bg-slate-900/95 border-slate-700/60' : 'bg-white/95 border-primary-100'} backdrop-blur-md`}
      >
        <div className="max-w-md mx-auto flex items-center gap-3 px-5 py-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #002855, #003D7A)' }}>
            <Wallet className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex-1">
            <p className={`text-base font-bold leading-none ${heading}`}>Second Bank</p>
            <p className={`text-[11px] ${subheading}`}>Personal Banking</p>
          </div>
          {/* Balance pill */}
          <div className={`flex items-center gap-1.5 text-right px-3 py-1.5 rounded-xl ${dark ? 'bg-slate-700/60' : 'bg-primary-50 border border-primary-100'}`}>
            <div>
              <p className={`text-[10px] font-medium ${subheading}`}>Balance</p>
              <p className={`text-sm font-bold ${heading}`}>
                {balanceHidden
                  ? '••••••'
                  : `GH₵${balance.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBalanceHidden((h) => !h)}
              className={`p-1 rounded-lg transition-colors ${dark ? 'text-slate-400 hover:text-slate-200' : 'text-primary-400 hover:text-brand-navy'}`}
              aria-label={balanceHidden ? 'Show balance' : 'Hide balance'}
            >
              {balanceHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Page title*/}
      <div className="max-w-md mx-auto w-full px-5 pt-6 pb-2">
        <h1 className={`text-xl font-black ${heading}`}>{tabTitles[tab]}</h1>
        <p className={`text-sm ${subheading}`}>{tabSubtitles[tab]}</p>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        <div className="max-w-md mx-auto px-5 py-4">
          {tab === 'transfer' && (
            <div className={`rounded-3xl border p-5 ${surface}`}>
              {/* Form always in the background; success replaces it */}
              {step !== 'success' && (
                <TransferForm dark={dark} onContinue={handleContinue} />
              )}
              {step === 'success' && transferResult && pendingData && (
                <SuccessScreen
                  result={transferResult}
                  formData={pendingData}
                  dark={dark}
                  onNewTransfer={handleNewTransfer}
                />
              )}
            </div>
          )}

          {tab === 'notifications' && <NotificationsTab dark={dark} />}
          {tab === 'settings' && (
            <SettingsTab dark={dark} onToggleDark={() => setDark((d) => !d)} />
          )}
        </div>
      </main>

      {/*  Bottom Nav  */}
      <BottomNav tab={tab} dark={dark} onChange={setTab} />

      {/*  Confirmation Modal (portal-like overlay) */}
      {step === 'confirm' && pendingData && (
        <ConfirmModal
          data={pendingData}
          dark={dark}
          balance={balance}
          isPending={isPending}
          isError={isError}
          error={error}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
