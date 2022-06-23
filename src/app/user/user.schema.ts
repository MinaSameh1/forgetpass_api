import { object, string } from 'zod'

export const loginUserSchema = object({
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
})

export const resetpassSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email("must be email!")
  }),
})
