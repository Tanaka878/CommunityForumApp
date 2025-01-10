import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true }, // Reference to a Community
  sender: { type: String, required: true }, // Name or identifier of the sender
  text: { type: String, required: true },   // Message content
  time: { type: Date, default: Date.now }, // Timestamp
  likes: { type: Number, default: 0 },     // Number of likes
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Nested replies
  mentions: [{ type: String }],            // Array of mentioned usernames
  tags: [{ type: String }],                // Array of tags
});

// Add a virtual field for ID compatibility
MessageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
MessageSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Message', MessageSchema);
