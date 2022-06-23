import { get, omit } from 'lodash'
import { signJwt, verifyJwt } from '../../utils/jwt.utils'
import { UserInput } from './user.model'
import { CreateUser, findOneUser, findUser } from './user.repository'

export async function login(username: string, password: string) {
  const user = await findOneUser({ username: username }, {})
  if (user && await user?.comparePassword(password)) {
    const refreshToken = signJwt(omit(user, 'password', 'token'), {
      expiresIn: '30d'
    })
    // This system is implemented to allow only one device to login.
    user.token = refreshToken
    user.save()
    return {
      accessToken: signJwt(omit(user, 'password', 'token'), {
        expiresIn: '15m',
      }),
      refreshToken: refreshToken,
    }
  }
  return false
}

export function createUser(user: UserInput) {
  return CreateUser(user)
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded || !get(decoded, 'id')) return false

  const user = await findOneUser({ _id: get(decoded, 'id', '') })

  if (!user) return false

  const accessToken = signJwt({ ...user }, { expiresIn: '15m' })

  return accessToken
}

export async function updatePass(pass: string, uid: string) {
  const user = await findOneUser({ _id: uid }, {})
  if (user) {
    user.password = pass
    user.save()
    return true
  }
  return false
}