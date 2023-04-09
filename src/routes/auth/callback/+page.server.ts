import { env }                from '$env/dynamic/private'
import { Issuer } from 'openid-client'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {
  const code_verifier = cookies.get('code_verifier')
  const state         = cookies.get('state')
  const nonce         = cookies.get('nonce')

  console.log('Get Request to callback API')
  console.log({state})
  console.log({code_verifier})
  console.log({nonce})

  const auth0Issuer = await Issuer.discover(`https://${env.AUTH0_DOMAIN}`)
    const client = new auth0Issuer.Client({
      client_id:     env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
    })

    const params   = client.callbackParams(url.href)
    console.log({params})
    const tokenSet = await client.callback('http://localhost:5173/auth/callback', params, {state, nonce, code_verifier: code_verifier})
    console.log({tokenSet})
    const userinfo = await client.userinfo(tokenSet)
    console.log({userinfo})
    return {
      userinfo,
      logoutUrl: `https://${env.AUTH0_DOMAIN}/v2/logout?returnTo=${env.AUTH0_REDIRECT_URI}`
    }
    // const auth     = new Auth(userinfo, tokenSet)



  // const primarySub: Subject|undefined = primarySubStr ? new Subject({ str: primarySubStr }) : undefined

  // const auth: Auth = await authenticationService.authorizeByCodeGrant(url.href, state, code_verifier, nonce, primarySub)

  // const maxAge = 60 * 60 * 24
  // tokenSet.access_token  ? cookies.set('access_token',  tokenSet.access_token,  { path: '/', maxAge: maxAge, httpOnly: true,  secure: false, sameSite: 'lax'}) : {}
  // tokenSet.access_token  ? cookies.set('eq',  tokenSet.access_token,  { path: '/', maxAge: maxAge, httpOnly: true,  secure: false, sameSite: 'lax'}) : {}
  // tokenSet.id_token      ? cookies.set('id_token',      tokenSet.id_token,      { path: '/', maxAge: maxAge, httpOnly: true,  secure: false, sameSite: 'lax'}) : {}
  // tokenSet.refresh_token ? cookies.set('refresh_token', tokenSet.refresh_token, { path: '/', maxAge: maxAge, httpOnly: false, secure: false}) : {}
  // auth.authUserId        ? cookies.set('auth_user_id',  auth.authUserId,        { path: '/', maxAge: maxAge, httpOnly: false, secure: false}) : {}

  // return { auth: JSON.parse(JSON.stringify(auth)) }
}
