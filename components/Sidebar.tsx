'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Page } from '@/app/dashboard/page'

const navItems = [
  { id: 'home', label: 'Resumen' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'budget', label: 'Presupuesto' },
  { id: 'guests', label: 'Invitados' },
  { id: 'vendors', label: 'Proveedores' },
]

interface Props {
  page: Page
  setPage: (p: Page) => void
  name1: string
  name2: string
}

export default function Sidebar({ page, setPage, name1, name2 }: Props) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 h-full w-[230px] bg-white border-r border-gray-100 flex flex-col z-10">
      <div className="p-7 border-b border-gray-100">
        <div className="font-display text-lg font-light tracking-widest uppercase">Vowed</div>
        <div className="font-mono-custom text-xs text-[#C9A84C] tracking-wider mt-1 uppercase">
          {name1} & {name2}
        </div>
      </div>

      <div className="flex-1 py-4">
        <div className="font-mono-custom text-xs tracking-widest uppercase text-gray-300 px-7 py-2">
          Principal
        </div>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`w-full text-left px-7 py-2.5 text-sm border-l-2 transition-all ${
              page === item.id
                ? 'border-[#C9A84C] bg-[#FDFAF2] text-black font-medium'
                : 'border-transparent text-gray-400 hover:text-black hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-7 border-t border-gray-100">
        <div className="font-display text-5xl font-light text-black leading-none">—</div>
        <div className="font-mono-custom text-xs uppercase tracking-widest text-gray-300 mt-1">
          días para la boda
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 font-mono-custom text-xs tracking-widest uppercase text-gray-300 hover:text-black transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
