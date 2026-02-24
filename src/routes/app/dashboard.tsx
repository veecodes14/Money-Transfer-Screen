import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Shield, CreditCard, BarChart2 } from 'lucide-react'

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">BK</div>
            <div>
              <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
              <p className="text-slate-300 text-sm">Overview of your banking activity</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-medium">Account Security</h3>
            </div>
            <p className="text-slate-300 text-sm">Your account is protected with industry-leading security.</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-medium">Cards</h3>
            </div>
            <p className="text-slate-300 text-sm">2 active cards • Last payment $124.50</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-medium">Spending</h3>
            </div>
            <p className="text-slate-300 text-sm">Monthly spending up 3% from last month.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
