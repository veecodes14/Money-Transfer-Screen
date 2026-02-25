import { X, FlaskConical } from 'lucide-react'
import type { DevFlags } from '../types/transfer'

interface DevDrawerProps {
  open: boolean
  dark: boolean
  flags: DevFlags
  onChange: (flags: DevFlags) => void
  onClose: () => void
}

interface ToggleRowProps {
  label: string
  description: string
  active: boolean
  onToggle: () => void
  dark: boolean
}

function ToggleRow({ label, description, active, onToggle, dark }: ToggleRowProps) {
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 ${dark ? 'bg-slate-700/20' : 'bg-white'}`}>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-brand-navy'}`}>{label}</p>
        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-primary-400'}`}>{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-label={`Toggle ${label}`}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200
          ${active ? 'bg-brand-gold' : dark ? 'bg-slate-600' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200
            ${active ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  )
}

function TextInputRow({
  label,
  value,
  onChange,
  dark,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  dark: boolean
}) {
  return (
    <div className={`px-4 py-3 ${dark ? 'bg-slate-700/20' : 'bg-white'}`}>
      <p className={`text-xs font-semibold mb-1.5 ${dark ? 'text-slate-400' : 'text-primary-400'}`}>{label}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-sm rounded-lg px-3 py-2 border outline-none transition-all
          ${dark
            ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-brand-gold'
            : 'bg-primary-50 border-primary-200 text-brand-navy placeholder:text-primary-300 focus:border-brand-navy'
          }`}
      />
    </div>
  )
}

export function DevDrawer({ open, dark, flags, onChange, onClose }: DevDrawerProps) {
  const set = <K extends keyof DevFlags>(key: K, value: DevFlags[K]) =>
    onChange({ ...flags, [key]: value })

  const sheet = dark
    ? 'bg-slate-800 border-t border-slate-700 text-white'
    : 'bg-white border-t border-primary-100'
  const divider = dark ? 'divide-slate-700' : 'divide-primary-100'
  const sectionLabel = dark ? 'text-slate-400' : 'text-primary-400'
  const item = dark ? 'border border-slate-600/50' : 'border border-primary-100'

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl shadow-2xl ${sheet}`}
      >
        {/* Handle */}
        <div className="sticky top-0 z-10 pt-3 pb-2 flex flex-col items-center"
          style={{ background: dark ? '#1e293b' : '#ffffff' }}
        >
          <div className={`w-10 h-1 rounded-full mb-3 ${dark ? 'bg-slate-600' : 'bg-gray-200'}`} />
          <div className="w-full max-w-md mx-auto px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-brand-gold" />
              <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-brand-navy'}`}>Dev Tools</p>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/20 text-amber-600">DEBUG</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors ${dark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-primary-50 text-primary-400'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto px-5 pb-8 space-y-5 pt-2">

          {/* Account Validation */}
          <div className="space-y-1.5">
            <p className={`text-xs font-semibold uppercase tracking-wide px-1 ${sectionLabel}`}>
              Account Validation
            </p>
            <div className={`rounded-2xl overflow-hidden divide-y ${divider} ${item}`}>
              <ToggleRow
                dark={dark}
                label="Force Loading"
                description="Shows spinner on account number field"
                active={flags.validationLoading}
                onToggle={() => set('validationLoading', !flags.validationLoading)}
              />
              <ToggleRow
                dark={dark}
                label="Force Error"
                description="Shows error message below account field"
                active={flags.validationError}
                onToggle={() => set('validationError', !flags.validationError)}
              />
              {flags.validationError && (
                <TextInputRow
                  dark={dark}
                  label="Error message"
                  value={flags.validationErrorMsg}
                  onChange={(v) => set('validationErrorMsg', v)}
                />
              )}
            </div>
          </div>

          {/* Transfer / Confirm Modal */}
          <div className="space-y-1.5">
            <p className={`text-xs font-semibold uppercase tracking-wide px-1 ${sectionLabel}`}>
              Transfer / Confirm Modal
            </p>
            <div className={`rounded-2xl overflow-hidden divide-y ${divider} ${item}`}>
              <ToggleRow
                dark={dark}
                label="Force Loading"
                description="Confirm button shows spinner indefinitely"
                active={flags.transferLoading}
                onToggle={() => set('transferLoading', !flags.transferLoading)}
              />
              <ToggleRow
                dark={dark}
                label="Force Error"
                description="Shows error message inside confirm modal"
                active={flags.transferError}
                onToggle={() => set('transferError', !flags.transferError)}
              />
              {flags.transferError && (
                <TextInputRow
                  dark={dark}
                  label="Error message"
                  value={flags.transferErrorMsg}
                  onChange={(v) => set('transferErrorMsg', v)}
                />
              )}
            </div>
          </div>

          {/* Success Screen */}
          <div className="space-y-1.5">
            <p className={`text-xs font-semibold uppercase tracking-wide px-1 ${sectionLabel}`}>
              Success Screen
            </p>
            <div className={`rounded-2xl overflow-hidden divide-y ${divider} ${item}`}>
              <ToggleRow
                dark={dark}
                label="Show Success Screen"
                description="Skips form and jumps directly to success state"
                active={flags.showSuccess}
                onToggle={() => set('showSuccess', !flags.showSuccess)}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
