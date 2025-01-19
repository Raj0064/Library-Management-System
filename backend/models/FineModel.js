import mongoose from "mongoose";

const FineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  transactionDate: { type: Date, default: Date.now },
});
export const Fine=mongoose.model("FineModel",FineSchema);