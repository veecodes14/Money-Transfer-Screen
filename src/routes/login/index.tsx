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
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
              BK
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
              <p className="text-sm text-slate-300">Sign in to your bank account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">Username</div>
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg">
                <div className="px-3 text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="you@bank.com"
                  className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">Password</div>
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg">
                <div className="px-3 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-400 focus:outline-none"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold disabled:opacity-60"
              >
                {isLoading ? (
                  <svg
                    className="w-5 h-5 animate-spin text-white"
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

        <p className="text-center text-sm text-slate-400 mt-4">Need an account? Contact your branch to register.</p>
      </div>
    </div>
  )
}


