// Dynamically sets the Clerk satellite domain from the current hostname,
// allowing a single deployment to serve multiple domains.
export default defineNuxtPlugin({
  name: 'clerk-domain',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    config.public.clerk.domain = window.location.host
  },
})
