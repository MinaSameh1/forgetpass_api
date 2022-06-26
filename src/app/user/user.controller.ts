import { NextFunction, Request, Response } from 'express'
import { createUser, login, updatePass } from './user.service'
import { randomBytes } from 'crypto'
import { findOneUser } from './user.repository'
import { createToken, findToken } from '../token/token.repository'
import { sendmail } from '../../utils/sendmail'
import logger from '../../utils/logger'

export async function getUserInfoController(_: Request, res: Response) {
  if (res.locals.user) return res.status(200).json(res.locals.user)
  return res.status(400).json({ message: 'No token sent!' })
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokens = await login(req.body.username, req.body.password)
    if (tokens) {
      res.cookie('x-refresh', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      })
      return res.status(200).json(tokens)
    }
    return res.status(400).json({ message: "Wrong username/pass" })
  } catch (e: unknown) {
    next(e)
  }
}

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body)
    if (user) {
      return res.status(200).json({ message: 'User Created' })

    }
    return res.status(400).json({ message: 'User not created' })
  } catch (err: unknown) {
    next(err)
  }
}

export async function requestResetPassController(req: Request, res: Response, next: NextFunction) {
  try {
    const token = randomBytes(10).toString("hex")
    const user = await findOneUser({ email: req.body.email })
    if (!user) return res.status(409).json({ message: "User doesn't exist!" })
    await createToken({ uid: user._id, token: token })
    const url = `${process.env['BASE_URL']}/resetpass/${token}`
    await sendmail(req.body.email, url)
    res.status(200).json({ message: 'Sent Password resetlink ' })
  } catch (err: unknown) {
    next(err)
  }
}

export async function checktokenController(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await findToken(req.params.token)
    logger.info(`type of token:${typeof token}`)
    if (token) return res.status(200).json({ message: 'Correct Link' })
    return res.status(400).json({ message: 'Invalid Token/link' })
  } catch (err: unknown) {
    next(err)
  }
}

export async function resetPassController(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await findToken({ token: req.params.token })
    if (token?.uid) {
      const check = await updatePass(req.body.password, token.uid.toString())
      if (check) {
        return res.status(200).json({ message: 'Password reset correct' })
      }
    }
    return res.status(400).json({ message: 'Invalid Link/Token' })
  } catch (err: unknown) {
    next(err)
  }
}