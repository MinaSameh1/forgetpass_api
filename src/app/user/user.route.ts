import { Router } from 'express'
import { USER_ENDPOINT } from '../../constants/endpoint'
import requireUser from '../../middleware/requireUser'
import validateResource from '../../middleware/validateResource'
import { emailBody as emailSchema, loginUserSchema, resetpassSchema, tokenParam } from './user.schema'
import { checktokenController, createUserController, getUserInfoController, loginController, requestResetPassController, resetPassController } from './user.controller'

export const router: Router = Router()

router.get(USER_ENDPOINT, requireUser, getUserInfoController)

router.post(
  USER_ENDPOINT, createUserController)

router.post(
  USER_ENDPOINT + "/login",
  validateResource(loginUserSchema),
  loginController
)

router.post(
  USER_ENDPOINT + "/request",
  validateResource(emailSchema),
  requestResetPassController
)

router.post(
  USER_ENDPOINT + "/:token",
  validateResource(tokenParam),
  checktokenController
)

router.patch(
  USER_ENDPOINT + "/:token",
  validateResource(tokenParam),
  validateResource(resetpassSchema),
  resetPassController
)