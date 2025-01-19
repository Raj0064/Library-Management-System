import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    profileImage: { type: String },
    borrowedBooks: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        transactionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Transaction",
        },
        borrowedDate: { type: Date },
        dueDate: { type: Date },
      },
    ],
    // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    fines: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const User=mongoose.model("UserModel",UserSchema);