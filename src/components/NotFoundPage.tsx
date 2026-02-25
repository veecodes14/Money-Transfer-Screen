import { useRouter } from '@tanstack/react-router'
import { Wallet, MoveLeft, Home } from 'lucide-react'

export function NotFoundPage() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ background: 'linear-gradient(160deg, #001A3A 0%, #002855 60%, #003D7A 100%)' }}
    >
      {/* Logo */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6"
        style={{ background: 'linear-gradient(135deg, #002855, #003D7A)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <Wallet className="w-8 h-8 text-white" strokeWidth={2} />
      </div>

      {/* 404 */}
      <p
        className="text-8xl font-black mb-2 leading-none"
        style={{ color: 'rgba(255,255,255,0.08)' }}
      >
        404
      </p>

      <h1 className="text-2xl font-black text-white mb-2 -mt-4">Page not found</h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: '#80AACC' }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#B3CCE0', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <MoveLeft className="w-4 h-4" />
          Go back
        </button>
        <button
          type="button"
          onClick={() => router.navigate({ to: '/app/transfer' })}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #D4A843, #B08A2E)', color: '#001A3A' }}
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>
    </div>
  )
}
