// Dynamically sets the Clerk satellite domain from the current hostname,
// allowing a single deployment to serve multiple domains.
// Satellite sync is only enabled when Clerk has already confirmed an active
// session (__client_uat is set and non-zero). Anonymous users and first-time
// visitors are served without triggering the cross-domain redirect chain.
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
      config.public.clerk.isSatellite = false
    }
  },
})
