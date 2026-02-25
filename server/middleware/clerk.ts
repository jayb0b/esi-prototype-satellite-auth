import { clerkMiddleware } from '@clerk/nuxt/server'
import { getRequestURL, parseCookies } from 'h3'

export default defineEventHandler((event) => {
  // Only run the Clerk satellite sync when there is evidence of an active
  // session. __client_uat is set by Clerk after any session interaction and
  // is non-zero while a session is live. Skipping for anonymous/bot requests
  // prevents the satellite sync redirect and the resulting __clerk_synced=true
  // appearing in URLs.
  const { __client_uat } = parseCookies(event)
  if (!__client_uat || __client_uat === '0') return

  return clerkMiddleware({
    domain: getRequestURL(event).host,
    signInUrl: `${process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? 'http://localhost:3000'}/login`,
  })(event)
})
