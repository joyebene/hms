import mongoose from "mongoose";

const BillingSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    diagnosis: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" },
    amount: Number,
    status: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
    },
    paymentMethod: String,
  },
  { timestamps: true }
);

export default mongoose.models.Billing ||
  mongoose.model("Billing", BillingSchema);