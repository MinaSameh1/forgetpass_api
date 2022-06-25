import { boolean, object, string } from 'zod'

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

export const tokenParam = object({
  param: object({
    token: string({
      required_error: 'Token is missing'
    })
  })
})

export const resetpassSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  })
})

export const emailBody = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    })
  })
})

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  email: string({
    required_error: 'Email is required'
  }),
  role: string({
    required_error: 'role is required!'
  }),
  isAdmin: boolean({
    required_error: 'isAdmin is boolean and required'
  }),
  })
})