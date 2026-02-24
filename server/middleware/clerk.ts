import { clerkMiddleware } from '@clerk/nuxt/server'

export default clerkMiddleware({
  signInUrl: process.env.NUXT_PUBLIC_CLERK_SIGN_IN_URL ?? 'http://localhost:3000/login',
})
