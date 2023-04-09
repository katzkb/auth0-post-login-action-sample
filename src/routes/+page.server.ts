import { env }                from '$env/dynamic/private'
import * as auth0             from 'auth0'
import { generators, Issuer } from 'openid-client'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const auth0Issuer = await Issuer.discover(`https://${env.AUTH0_DOMAIN}`)

  const client = new auth0Issuer.Client({
    client_id:     env.AUTH0_CLIENT_ID,
    client_secret: env.AUTH0_CLIENT_SECRET,
    redirect_uris: [`${env.AUTH0_AUDIENCE}/api/auth/callback`],
    response_type: 'code',
  })

  const code_verifier  = generators.codeVerifier()
  const code_challenge = generators.codeChallenge(code_verifier)
  const state          = generators.state()
  const nonce          = generators.nonce()

  const authorizationUrl = client.authorizationUrl({
    scope:                 'openid email profile offline_access',
    state,
    nonce,
    code_challenge,
    code_challenge_method: 'S256',
  })

  return { authorizationUrl }
}