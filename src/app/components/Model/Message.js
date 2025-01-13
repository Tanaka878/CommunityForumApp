import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  time: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  communityId: String,
  mentions: [String],
  tags: [String],
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);