// Dynamically sets the Clerk satellite domain from the current hostname,
// allowing a single deployment to serve multiple domains.
//
// Satellite sync is enabled in three cases:
//  1. __client_uat is set and non-zero — an active session exists on this domain
//  2. __clerk_sync=1 is in the URL — the user just signed in on the primary and
//     was redirected here; Clerk.js needs to do one sync round-trip to transfer
//     the session
//  3. __clerk_synced=true is in the URL — we are on the return leg of that
//     round-trip and Clerk.js needs to finalise the session
//
// In all other cases isSatellite is disabled so anonymous users and bots are
// served without triggering the cross-domain redirect chain.
export default defineNuxtPlugin({
  name: 'clerk-domain',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    const url = new URL(window.location.href)

    const clientUat = document.cookie
      .split(';')
      .find(c => c.trim().startsWith('__client_uat='))
      ?.split('=')[1]

    const syncTrigger = url.searchParams.has('__clerk_sync') || url.searchParams.has('__clerk_synced')

    if ((clientUat && clientUat !== '0') || syncTrigger) {
      config.public.clerk.domain = window.location.host
      // Remove our custom trigger param — Clerk.js does not need it.
      // __clerk_synced is left in place so Clerk.js can process the session.
      if (url.searchParams.has('__clerk_sync')) {
        url.searchParams.delete('__clerk_sync')
        window.history.replaceState({}, '', url.toString())
      }
    } else {
      config.public.clerk.isSatellite = false
    }
  },
})
