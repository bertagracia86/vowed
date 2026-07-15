import { useState, useEffect, useRef } from 'react'
import { Session } from './auth'

interface ListApi<T> {
  fetch: (userId: string) => Promise<T[]>
  seed: (userId: string, rows: T[]) => Promise<void>
  sync: (userId: string, rows: T[]) => Promise<void>
}

export function usePersistedList<T extends { id: string }>(
  api: ListApi<T>,
  session: Session | null | undefined,
  defaults: T[]
): [T[], (rows: T[]) => void] {
  const [rows, setRows] = useState<T[]>(defaults)
  const loaded = useRef(false)

  useEffect(() => {
    loaded.current = false
    if (!session || session.demo) { setRows(defaults); return }
    const userId = session.userId!
    api.fetch(userId).then(async remote => {
      if (remote.length > 0) {
        setRows(remote)
      } else {
        await api.seed(userId, defaults)
        setRows(defaults)
      }
      loaded.current = true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (!loaded.current || !session || session.demo) return
    api.sync(session.userId!, rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows])

  const setRowsGuarded = session?.demo ? () => {} : setRows

  return [rows, setRowsGuarded]
}
