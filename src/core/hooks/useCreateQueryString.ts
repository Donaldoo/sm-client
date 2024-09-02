import { useCallback } from 'react'

export default function useCreateQueryString(searchParams: URLSearchParams) {
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (!value) params.delete(name)
      else params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const removeQueryString = useCallback(
    (...args: string[]) => {
      const params = new URLSearchParams(searchParams)
      args.forEach(name => params.delete(name))
      return params.toString()
    },
    [searchParams]
  )
  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    return params.toString()
  }, [searchParams])

  const clearExcept = useCallback((name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)
    return params.toString()
  }, [])

  return { createQueryString, removeQueryString, getQueryString, clearExcept }
}
