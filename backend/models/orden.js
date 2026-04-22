import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        title: String,
        quantity: Number,
        price: Number
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending"
    },
    shippingAddress: {
      country: String,
      city: String,
      details: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);