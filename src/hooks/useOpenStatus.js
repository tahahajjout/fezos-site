import { useEffect, useState } from 'react'
import { openStatus } from '../lib/time'

/** Live open/closed status in salon time, refreshed every minute. */
export function useOpenStatus() {
  const [status, setStatus] = useState(() => openStatus())
  useEffect(() => {
    const id = setInterval(() => setStatus(openStatus()), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}
