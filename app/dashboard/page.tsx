'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import HomePanel from '@/components/HomePanel'
import ChecklistPanel from '@/components/ChecklistPanel'
import BudgetPanel from '@/components/BudgetPanel'
import GuestsPanel from '@/components/GuestsPanel'
import VendorsPanel from '@/components/VendorsPanel'

export type Page = 'home' | 'checklist' | 'budget' | 'guests' | 'vendors'

export default function Dashboard() {
  const router = useRouter()
  const [page, setPage] = useState<Page>('home')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-2xl font-light tracking-widest uppercase text-white mb-4">Vowed</div>
          <div className="w-16 h-px bg-[#C9A84C] mx-auto" />
        </div>
      </div>
    )
  }

  const name1 = user?.user_metadata?.name1 || 'Tú'
  const name2 = user?.user_metadata?.name2 || 'Tu pareja'

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar page={page} setPage={setPage} name1={name1} name2={name2} />
      <main className="ml-[230px] flex-1 p-12 max-w-5xl">
        {page === 'home' && <HomePanel name1={name1} name2={name2} setPage={setPage} />}
        {page === 'checklist' && <ChecklistPanel />}
        {page === 'budget' && <BudgetPanel />}
        {page === 'guests' && <GuestsPanel />}
        {page === 'vendors' && <VendorsPanel />}
      </main>
    </div>
  )
}
