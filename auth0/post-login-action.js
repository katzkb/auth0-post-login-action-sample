// リダイレクト
const redirectToValidationPage = async (event, api) => {
  const AUTH0_DOMAIN = event.secrets.AUTH0_DOMAIN
  const token = api.redirect.encodeToken({
    secret:           event.secrets.AUTH0_ACTIONS_SECRET,
    expiresInSeconds: 3600,
    payload: {
      continue_uri:   `https://${AUTH0_DOMAIN}/continue`,
      name:           event.user.name ?? '',
      address:        event.user.user_metadata.address ?? '',
    }
  })

  api.redirect.sendUserTo("http://localhost:5173/auth/login/step/2", {
    query: { sessionToken: token }
  })
}

// ユーザーデータを更新するためのメソッドを用意
// https://community.auth0.com/t/updating-user-profile-from-actions/85206
const updateUser = async (event, data) => {
  const ManagementClient = require('auth0').ManagementClient

  const management = new ManagementClient({
    domain:       event.secrets.AUTH0_DOMAIN,
    clientId:     event.secrets.CLIENT_ID,
    clientSecret: event.secrets.CLIENT_SECRET
  })

  const params = { id: event.user.user_id }
  await management.updateUser(params, data, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  // 追加情報が未入力であれば追加情報入力画面へリダイレクトする
  if (!event.user.name || !event.user.user_metadata.address) {
    await redirectToValidationPage(event, api)
  }
};


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onContinuePostLogin = async (event, api) => {
  let payload
  // トークンを検証して取り出し
  try {
    payload = api.redirect.validateToken({
      secret:             event.secrets.AUTH0_ACTIONS_SECRET,
      tokenParameterName: 'sessionToken'
    })
  } catch (e) {
    console.log(e)
    api.access.deny('トークンの検証に失敗しました')
    return
  }
  // 追加情報が未入力であれば追加情報入力画面へリダイレクトする
  if (!payload.name || !payload.address) {
    await redirectToValidationPage(event, api)
    return
  }
  // 問題がなければデータを更新して完了
  api.user.setUserMetadata('address', payload.address)
  await updateUser(event, { name: payload.name })
};