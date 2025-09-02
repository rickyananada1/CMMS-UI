import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebouncedCallback(callback, delay = 0, options) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(callback, delay, options), [callback, delay, options])
}

export function useDebounce(value, delay = 0, options) {
  const previousValue = useRef(value)
  const [current, setCurrent] = useState(value)
  const debouncedCallback = useDebouncedCallback((value) => setCurrent(value), delay, options)
  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedCallback(value)
      previousValue.current = value
      return debouncedCallback.cancel
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return current
}
