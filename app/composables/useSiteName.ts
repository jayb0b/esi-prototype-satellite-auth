export function useSiteName(): string {
  const host = useRequestURL().host
  return host.includes('jaybob') ? 'ENVIRPRO' : 'EXTERNAL WORKS'
}
