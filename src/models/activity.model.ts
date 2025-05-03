import mongoose, { Schema, type Document } from "mongoose"

export interface IActivity extends Document {
  userId: number
  activityDate: Date
  points: number
  createdAt: Date
  updatedAt: Date
}

const ActivitySchema: Schema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      ref: "User",
    },
    activityDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    points: {
      type: Number,
      required: true,
      default: 20, // Each activity is worth 20 points as specified
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for faster filtering and aggregation
ActivitySchema.index({ userId: 1, activityDate: 1 })
ActivitySchema.index({ activityDate: 1 })

export default mongoose.model<IActivity>("Activity", ActivitySchema)
