import { env } from '$env/dynamic/private'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const params = new URLSearchParams({
    client_id: env.AUTH0_CLIENT_ID,
    returnTo:  env.AUTH0_REDIRECT_URI
  })
  return { logoutUrl: `https://${env.AUTH0_DOMAIN}/v2/logout?` + params }
}