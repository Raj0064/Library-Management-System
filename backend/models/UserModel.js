import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    libraryId: {
      type: String,
      unique: true,
    },
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
    fines: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-save hook to generate unique 6-digit libraryId
UserSchema.pre("save", async function (next) {
  if (!this.libraryId) {
    let newLibraryId;
    let idExists = true;

    while (idExists) {
      newLibraryId = Math.floor(100000 + Math.random() * 900000).toString();
      idExists = await mongoose
        .model("UserModel")
        .exists({ libraryId: newLibraryId });
    }

    this.libraryId = newLibraryId;
  }
  next();
});

export const User = mongoose.model("UserModel", UserSchema);
