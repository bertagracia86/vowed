import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'
import { Session } from './auth'
import { WeddingInfo } from './types'

export function usePersistedWeddingInfo(
  session: Session | null | undefined,
  defaults: WeddingInfo
): [WeddingInfo, (w: WeddingInfo) => void] {
  const [info, setInfo] = useState<WeddingInfo>(defaults)
  const loaded = useRef(false)

  useEffect(() => {
    loaded.current = false
    if (!session || session.demo) { setInfo(defaults); return }
    const userId = session.userId!
    supabase.from('vowed_wedding_info').select('*').eq('user_id', userId).maybeSingle().then(async ({ data }) => {
      if (data) {
        const { user_id, updated_at, ...rest } = data as any
        setInfo(rest)
      } else {
        await supabase.from('vowed_wedding_info').insert({ ...defaults, user_id: userId })
        setInfo(defaults)
      }
      loaded.current = true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (!loaded.current || !session || session.demo) return
    supabase.from('vowed_wedding_info').upsert({ ...info, user_id: session.userId! })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])

  const setInfoGuarded = session?.demo ? () => {} : setInfo

  return [info, setInfoGuarded]
}
