import mongoose from "mongoose";

const secondHandSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    conditionDetails: String,
    realImages: [String],
    approved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("SecondHand", secondHandSchema);