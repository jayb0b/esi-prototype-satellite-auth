import { clerkMiddleware } from '@clerk/nuxt/server'
import { getRequestURL } from 'h3'

export default defineEventHandler((event) => {
  return clerkMiddleware({
    domain: getRequestURL(event).origin,
    signInUrl: `${process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? 'http://localhost:3000'}/login`,
  })(event)
})
