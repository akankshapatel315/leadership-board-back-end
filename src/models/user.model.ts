import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  userId: number
  fullName: string
  totalPoints: number
  rank: number
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster sorting and querying
UserSchema.index({ totalPoints: -1, userId: 1 })
UserSchema.index({ userId: 1 }, { unique: true })

export default mongoose.model<IUser>("User", UserSchema)
