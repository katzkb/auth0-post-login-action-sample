import { env }      from '$env/dynamic/private'
import * as jwt     from 'jsonwebtoken'
import { error }    from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const query        = url.searchParams
  const sessionToken = query.get('sessionToken')
  const state        = query.get('state')

  interface DecodedSessionToken {
    sub:          string
    continue_uri: string
    name:         string
    address:      string
  }

  if (!sessionToken || !state) {
    throw error(400, {
      message: 'Bad Request'
    })
  }

  let decodedToken: DecodedSessionToken
  try {
    decodedToken = jwt.verify(sessionToken, env.AUTH0_ACTIONS_SECRET, {
      issuer:     env.AUTH0_DOMAIN,
      algorithms: ['HS256'],
    })
  } catch {
    throw error(400, {
      message: 'Bad Request'
    })
  }

  return {
    userId:      decodedToken.sub,
    continueUri: decodedToken.continue_uri,
    name:        decodedToken.name,
    address:     decodedToken.address,
    state
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  continue: async ({request}) => {
    const data        = await request.formData();
    const name        = data.get('name')
    const address     = data.get('address')
    const userId      = data.get('userId')
    const continueUri = data.get('continueUri')
    const state       = data.get('state')
    if (!name || !address || !userId || !continueUri || !state) {
      throw error(400, { message: 'Bad Request' })
    }
    const sessionToken =
      jwt.sign(
        { continue_uri: continueUri, name, address, state },
        env.AUTH0_ACTIONS_SECRET,
        {
          algorithm: 'HS256',
          subject:   userId,
          issuer:    env.APP_URL,
          expiresIn: 60,
        })

    throw redirect(302, `${continueUri}?state=${state}&sessionToken=${sessionToken}`)
  }
};
