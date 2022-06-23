import { object, string } from 'zod'

export const loginUserSchema = object({
  body: object({
    username: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Name is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
})
