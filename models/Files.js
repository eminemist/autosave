import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide file name"],
      maxlength: 50,
    },
    
    
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("File", FileSchema);
