import { Moon, Sun, ChevronRight, Shield, HelpCircle, LogOut } from 'lucide-react'

interface SettingsTabProps {
  dark: boolean
  onToggleDark: () => void
}

export function SettingsTab({ dark, onToggleDark }: SettingsTabProps) {
  const muted = dark ? 'text-slate-400' : 'text-gray-500'
  const item = dark
    ? 'bg-slate-700/40 border border-slate-600/50 text-white'
    : 'bg-white border border-gray-200 text-gray-900'
  const divider = dark ? 'divide-slate-700' : 'divide-gray-100'

  const settingGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: dark ? Moon : Sun,
          label: 'Dark Mode',
          description: dark ? 'Currently on' : 'Currently off',
          action: (
            <button
              type="button"
              onClick={onToggleDark}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                ${dark ? 'bg-cyan-500' : 'bg-gray-300'}`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200
                  ${dark ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: Shield,
          label: 'Security Settings',
          description: 'Manage 2FA and PIN',
          action: <ChevronRight className={`w-4 h-4 ${muted}`} />,
        },
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Contact us or view FAQs',
          action: <ChevronRight className={`w-4 h-4 ${muted}`} />,
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl ${item}`}>
        <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-base shrink-0">
          AC
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>
            Ava Customer
          </p>
          <p className={`text-xs truncate ${muted}`}>customer@bank.com</p>
        </div>
      </div>

      {settingGroups.map((group) => (
        <div key={group.title} className="space-y-1.5">
          <p className={`text-xs font-semibold uppercase tracking-wide px-1 ${muted}`}>
            {group.title}
          </p>
          <div className={`rounded-2xl border overflow-hidden divide-y ${divider} ${item}`}>
            {group.items.map((row) => {
              const Icon = row.icon
              return (
                <div key={row.label} className={`flex items-center gap-3 px-4 py-3.5 ${dark ? 'bg-slate-700/20' : 'bg-white'}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${dark ? 'bg-slate-600/50' : 'bg-gray-100'}`}>
                    <Icon className={`w-4 h-4 ${dark ? 'text-slate-300' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
                      {row.label}
                    </p>
                    <p className={`text-xs ${muted}`}>{row.description}</p>
                  </div>
                  {row.action}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        type="button"
        onClick={() => (window.location.href = '/login')}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold
          ${dark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-100'}`}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      <p className={`text-center text-xs ${muted}`}>NovaBank v1.0.0</p>
    </div>
  )
}
