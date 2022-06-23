import mongoose from 'mongoose'
import argon from 'argon2'

export interface UserInput {
  email: string
  username: string
  password: string
  role: string
  isAdmin: boolean
}

export interface UserDocument extends UserInput, mongoose.Document {
  token: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.pre('save', async function (next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }

  const hash = await argon.hash(user.password)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return argon
    .verify(candidatePassword, user.password)
    .catch((e: unknown) => false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
