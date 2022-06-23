import { Router } from 'express'
import { USER_ENDPOINT } from '../../constants/endpoint'
import requireUser from '../../middleware/requireUser'
import validateResource from './../middleware/validateResource'
import { loginUserSchema } from './user.schema'
import { getUserInfoController, loginController } from './user.controller'

export const router: Router = Router()

router.get(USER_ENDPOINT, requireUser, getUserInfoController)

router.post(USER_ENDPOINT, validateResource(loginUserSchema) , loginController)
