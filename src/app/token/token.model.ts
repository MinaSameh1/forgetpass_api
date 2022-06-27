import mongoose, { Document } from 'mongoose'

export interface tokenDocuement extends Document {
  token: string
  uid: string
  createdAt: string
  updatedAt: string
}

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserTask'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Expire after 30 mins
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const TokenModel = mongoose.model('token', tokenSchema)

export default TokenModel