import jwt from 'jsonwebtoken'

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const signingKey = 'secretkey'

  return jwt.sign(object, signingKey, {
    ...(options && options)
  })
}

export function verifyJwt(token: string) {
  const publicKey = 'secretkey'

  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (e: any) {
    console.error(e)
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    }
  }
}
