import { SendHorizonal, Bell, Settings } from 'lucide-react'

export type Tab = 'transfer' | 'notifications' | 'settings'

interface BottomNavProps {
  tab: Tab
  dark: boolean
  unreadCount?: number
  onChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: 'transfer', label: 'Transfer', Icon: SendHorizonal },
  { id: 'notifications', label: 'Alerts', Icon: Bell },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export function BottomNav({ tab, dark, unreadCount = 0, onChange }: BottomNavProps) {
  const base = dark
    ? 'bg-slate-900/95 border-slate-700/60'
    : 'bg-white/95 border-gray-200'
  const activeColor = 'text-blue-500'
  const inactiveColor = dark ? 'text-slate-500' : 'text-gray-400'

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t ${base} safe-area-pb`}
    >
      <div className="max-w-md mx-auto flex">
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-wide transition-all relative
                ${active ? activeColor : inactiveColor}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
                {id === 'notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span>{label}</span>
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-blue-500" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
