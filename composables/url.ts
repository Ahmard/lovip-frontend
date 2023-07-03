export function useUrl(uri?: string): string {
  console.log(localStorage.getItem('server'))
  return `${localStorage.getItem('server')}/${uri}`
}

export function useApiUrl(uri?: string): string {
  const config = useRuntimeConfig()
  return useUrl(`api/${config.public.BACKEND_API_VERSION}/${uri}`)
}

export function useServerUrl(uri?: string): string {
  return useUrl(uri)
}
