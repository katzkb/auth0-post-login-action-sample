import { env }    from '$env/dynamic/private'
import { Issuer } from 'openid-client'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {
  const code_verifier = cookies.get('code_verifier')
  const state         = cookies.get('state')
  const nonce         = cookies.get('nonce')

  const auth0Issuer = await Issuer.discover(`https://${env.AUTH0_DOMAIN}`)
    const client = new auth0Issuer.Client({
      client_id:     env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
    })

    const params   = client.callbackParams(url.href)
    const tokenSet = await client.callback(`${env.AUTH0_AUDIENCE}}/auth/callback`, params, {state, nonce, code_verifier: code_verifier})
    const userinfo = await client.userinfo(tokenSet)
    return {
      userinfo,
      logoutUrl: `https://${env.AUTH0_DOMAIN}/v2/logout?returnTo=${env.AUTH0_REDIRECT_URI}`
    }
}
