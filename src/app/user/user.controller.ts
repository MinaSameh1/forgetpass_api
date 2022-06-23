import { NextFunction, Request, Response } from 'express'
import { login } from './user.service'

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
