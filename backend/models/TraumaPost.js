import mongoose from "mongoose";
 


const TraumaPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    tags: {
      type: [String],
      default: []
    },

    // Total upvote count (fast read)
    upvotes: {
      type: Number,
      default: 0
    },

    // To prevent multiple upvotes by same user
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // Stored only for moderation, never shown on UI
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const TraumaPost = mongoose.model("TraumaPost", TraumaPostSchema);
