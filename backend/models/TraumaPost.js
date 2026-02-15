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

  
    upvotes: {
      type: Number,
      default: 0
    },

  
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

   
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
