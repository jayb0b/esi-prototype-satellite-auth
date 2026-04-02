/**
 * Hydrates the user store from Clerk's reactive state on the client.
 *
 * Runs after every navigation so it doesn't matter whether the user arrived
 * via login, direct URL, or back/forward — the store is always in sync.
 * A .client.ts plugin because Clerk's useUser() is only meaningful on the client.
 */
export default defineNuxtPlugin(() => {
  const { isLoaded, isSignedIn, user } = useUser()
  const userStore = useUserStore()

  watch(
    [isLoaded, isSignedIn, user],
    ([loaded, signedIn, clerkUser]) => {
      if (!loaded) return

      if (signedIn && clerkUser) {
        userStore.hydrate(clerkUser.publicMetadata as Record<string, unknown>)
        await userStore.loadPersonContact()
      } else {
        userStore.reset()
      }
    },
    { immediate: true },
  )
})
