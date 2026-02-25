import { clerkMiddleware } from '@clerk/nuxt/server'
import { getRequestURL, parseCookies } from 'h3'

export default defineEventHandler((event) => {
  // Skip satellite sync entirely when there are no Clerk session cookies.
  // Requests from bots and anonymous users never have these cookies, so they
  // are served directly without the __clerk_synced redirect chain.
  const cookies = parseCookies(event)
  const clientUat = cookies['__client_uat']
  if (!clientUat || clientUat === '0') return

  return clerkMiddleware({
    domain: getRequestURL(event).host,
    signInUrl: `${process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? 'http://localhost:3000'}/login`,
  })(event)
})
