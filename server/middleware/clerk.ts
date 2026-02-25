import { clerkMiddleware } from '@clerk/nuxt/server'
import { getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  await clerkMiddleware({
    domain: url.host,
    signInUrl: `${process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? 'http://localhost:3000'}/login`,
  })(event)

  // After Clerk processes __clerk_synced (and sets __client_uat so the next
  // request won't re-sync), redirect to strip the parameter from the URL.
  // Without this, JS-disabled clients (bots) would see the dirty URL.
  if (url.searchParams.has('__clerk_synced')) {
    url.searchParams.delete('__clerk_synced')
    return sendRedirect(event, url.pathname + (url.search || ''), 302)
  }
})
