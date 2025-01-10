import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  sender: String,
  text: String,
  time: Date,
});

const MessageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  time: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  communityId: String,
  mentions: [String],
  tags: [String],
  replies: [ReplySchema], // Nested replies
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
