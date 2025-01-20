import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    ISBN: { type: String, unique: true },
    publicationYear: { type: Number },
    coverImage: { type: String },
    copiesAvailable: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    // reviews: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     rating: { type: Number, min: 1, max: 5 },
    //     comment: { type: String },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
    // averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const Book=mongoose.model("BookModel",BookSchema);