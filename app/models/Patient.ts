import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    gender: String,
    dateOfBirth: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);