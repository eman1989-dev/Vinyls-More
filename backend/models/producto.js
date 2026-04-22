import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    format: {
      type: String,
      enum: ["CD", "Vinyl", "Cassette"],
      required: true
    },
    year: Number,
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      default: 1
    },
    description: String,
    images: [String],
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isSecondHand: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);