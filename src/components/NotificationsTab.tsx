import { useState } from 'react'
import { Bell, TrendingDown, TrendingUp, Info, ShieldAlert } from 'lucide-react'
import { MOCK_NOTIFICATIONS } from '../utils/bankData'
import type { AppNotification } from '../types/transfer'

interface NotificationsTabProps {
  dark: boolean
}

const iconMap = {
  credit: TrendingUp,
  debit: TrendingDown,
  info: Info,
  alert: ShieldAlert,
}

const colorMap = {
  credit: 'text-emerald-400 bg-emerald-500/15',
  debit: 'text-blue-400 bg-blue-500/15',
  info: 'text-sky-400 bg-sky-500/15',
  alert: 'text-amber-400 bg-amber-500/15',
}

export function NotificationsTab({ dark }: NotificationsTabProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }

  const muted = dark ? 'text-slate-400' : 'text-gray-500'
  const itemBg = (read: boolean) =>
    dark
      ? read
        ? 'bg-slate-800/40'
        : 'bg-slate-700/60 border-l-2 border-cyan-500'
      : read
        ? 'bg-white'
        : 'bg-blue-50/60 border-l-2 border-blue-500'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-base font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className={`text-xs font-semibold ${dark ? 'text-cyan-400' : 'text-blue-600'}`}
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Bell className={`w-10 h-10 ${muted}`} />
          <p className={`text-sm ${muted}`}>No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type]
            const colors = colorMap[n.type]
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => markRead(n.id)}
                className={`w-full text-left flex gap-3 items-start px-4 py-3.5 rounded-2xl transition-all ${itemBg(n.read)}`}
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${colors}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm font-semibold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
                      {n.title}
                    </p>
                    <span className={`text-xs shrink-0 ${muted}`}>{n.time}</span>
                  </div>
                  <p className={`text-xs leading-snug ${muted}`}>{n.message}</p>
                </div>
                {!n.read && (
                  <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
