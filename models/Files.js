import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    //  required: true,
    },
    content: {
      type: String,
    //  required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    _userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
     // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", FileSchema);
