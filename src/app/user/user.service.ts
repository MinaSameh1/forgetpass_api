import { get, omit } from 'lodash'
import { signJwt, verifyJwt } from '../../utils/jwt.utils'
import { findOneUser, findUser } from './user.respository'

export async function login(username: string, password: string) {
  const user = await findOneUser({ username: username }, {})
  if (await user?.comparePassword(password)) {
    return {
      accessToken: signJwt(omit(user, 'password', 'token'), {
        expiresIn: '15m',
      }),
      refreshToken: signJwt(omit(user, 'password', 'token'), {
        expiresIn: '30d',
      }),
    }
  }
  return false
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded || !get(decoded, 'id')) return false

  const user = await findUser({ _id: get(decoded, 'id', '') })

  if (!user) return false

  const accessToken = signJwt({ ...user }, { expiresIn: '15m' })

  return accessToken
}
