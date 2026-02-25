// Dynamically sets the Clerk satellite domain from the current hostname,
// allowing a single deployment to serve multiple domains.
// Only enables satellite sync when there is an active session cookie —
// anonymous users and bots bypass the sync entirely.
export default defineNuxtPlugin({
  name: 'clerk-domain',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    const clientUat = document.cookie
      .split(';')
      .find(c => c.trim().startsWith('__client_uat='))
      ?.split('=')[1]

    if (clientUat && clientUat !== '0') {
      config.public.clerk.domain = window.location.host
    } else {
      // No active session — disable satellite sync so Clerk's JS does not
      // attempt a client-side redirect to the primary domain.
      config.public.clerk.isSatellite = false
    }
  },
})
