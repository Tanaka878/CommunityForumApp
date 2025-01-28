import mongoose from "mongoose";
import ConnectMongo from '@/app/libs/mongodb';
import Message from '../components/Model/Message';

// Improved function to get the count of unread messages
export async function getUnreadMessages(userId: string, communityId: string) {
  if (!communityId) {
    throw new Error("Community ID is required");
  }

  try {
    // Validate and convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Validate and convert communityId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      throw new Error("Invalid Community ID");
    }
    const communityObjectId = new mongoose.Types.ObjectId(communityId);

    console.time("ConnectMongo");
    await ConnectMongo(); // Ensure a stable, reusable connection
    console.timeEnd("ConnectMongo");

    console.time("MessageQuery");
    // Efficient query to count unread messages
    const unreadCount = await Message.countDocuments({
      communityId: communityObjectId, // Using ObjectId for the communityId field
      readBy: { $ne: userObjectId },  // Only messages where userId is not in readBy
    });
    console.timeEnd("MessageQuery");

    console.log(`Unread messages count for user ${userId} in community ${communityId}: ${unreadCount}`);

    return { count: unreadCount };
  } catch (error) {
    console.error("Error counting unread messages:", error);
    throw new Error("Failed to count unread messages");
  } 
}
