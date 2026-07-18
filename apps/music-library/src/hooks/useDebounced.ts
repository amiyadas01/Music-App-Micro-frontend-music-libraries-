import { useCallback, useEffect, useRef } from 'react'

/**
 * Debounces a *function call*, as opposed to `useDebouncedValue` which
 * debounces a value via an effect. This is the pattern you want when the
 * thing you're delaying is an action (search, autosave, API call) rather
 * than a piece of state to render.
 *
 * - Rapid calls reset the timer, so only the trailing call fires.
 * - Always invokes the latest `callback` passed in, even though the
 *   debounced function reference itself stays stable.
 * - Cleans up its pending timer on unmount so it never fires after the
 *   component is gone.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delayMs)
    },
    [delayMs],
  )
}
