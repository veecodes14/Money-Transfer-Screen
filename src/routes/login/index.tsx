import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { User, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate, isPending: isLoading, isError, error } = useAuth({
    onSuccess() {
      window.location.href = '/app/transfer'
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate({ username, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #001A3A 0%, #002855 60%, #003D7A 100%)' }}>
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#001A3A] font-bold shadow-md" style={{ background: 'linear-gradient(135deg, #E8C976, #D4A843)' }}>
              BK
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
              <p className="text-sm" style={{ color: '#B3CCE0' }}>Sign in to your bank account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: '#B3CCE0' }}>Username</div>
              <div className="flex items-center rounded-lg border" style={{ background: 'rgba(0,28,63,0.6)', borderColor: 'rgba(255,255,255,0.15)' }}>
                <div className="px-3" style={{ color: '#80AACC' }}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="you@bank.com"
                  className="w-full bg-transparent px-3 py-3 text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: '#B3CCE0' }}>Password</div>
              <div className="flex items-center rounded-lg border" style={{ background: 'rgba(0,28,63,0.6)', borderColor: 'rgba(255,255,255,0.15)' }}>
                <div className="px-3" style={{ color: '#80AACC' }}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full bg-transparent px-3 py-3 text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </label>

            {isError && (
              <div className="text-sm text-red-400">{error?.message ?? 'Login failed'}</div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold disabled:opacity-60 transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #D4A843, #B08A2E)', color: '#001A3A' }}
              >
                {isLoading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}
                <span>{isLoading ? 'Signing in…' : 'Sign in'}</span>
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: '#80AACC' }}>Need an account? Contact your branch to register.</p>
      </div>
    </div>
  )
}


