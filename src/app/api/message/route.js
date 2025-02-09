import { NextResponse } from "next/server";
import ConnectMongo from "../../libs/mongodb";
import Message from "../../components/Model/Message";

// Recursive function to format messages with nested replies
const formatMessage = (msg) => ({
  id: msg._id.toString(),
  sender: msg.sender,
  text: msg.text,
  time: msg.time.toISOString(),
  likes: msg.likes || 0,
  replies: msg.replies?.map(reply => formatMessage(reply)) || [],
  mentions: msg.mentions || [],
  tags: msg.tags || [],
});

// GET: Fetch messages for a community
export async function GET(request) {
  console.log("Getting messages")
  const { searchParams } = new URL(request.url);
  const communityId = searchParams.get("communityId");

  if (!communityId) {
    return NextResponse.json(
      { error: "Community ID is required" },
      { status: 400 }
    );
  }

  try {
    await ConnectMongo();
    
    // Only fetch root messages (those without a parentId)
    const rootMessages = await Message.find({ 
      communityId,
      parentId: null 
    }).populate({
      path: 'replies',
      populate: {
        path: 'replies',
        populate: {
          path: 'replies',
          populate: 'replies'
        }
      }
    }).sort({ time: 1 });

    const formattedMessages = rootMessages.map(msg => formatMessage(msg));
    return NextResponse.json(formattedMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new message or reply
export async function POST(request) {
  try {
    const { sender, text, communityId, mentions, tags, replyTo } = await request.json();

    if (!sender || !text || !communityId) {
      return NextResponse.json(
        { error: "Sender, text, and communityId are required" },
        { status: 400 }
      );
    }

    await ConnectMongo();

    const messageData = {
      sender,
      text,
      communityId,
      mentions: mentions || [],
      tags: tags || [],
      time: new Date(),
      likes: 0,
      replies: []
    };

    // If this is a reply, add the parentId
    if (replyTo) {
      const parentMessage = await Message.findById(replyTo);
      if (!parentMessage) {
        return NextResponse.json(
          { error: "Parent message not found" },
          { status: 404 }
        );
      }
      messageData.parentId = replyTo;
    }

    // Create the new message
    const newMessage = await Message.create(messageData);

    // If this is a reply, update the parent's replies array
    if (replyTo) {
      await Message.findByIdAndUpdate(
        replyTo,
        { $push: { replies: newMessage._id } },
        { new: true }
      );
    }

    // Populate the replies array before sending response
    const populatedMessage = await Message.findById(newMessage._id)
      .populate({
        path: 'replies',
        populate: {
          path: 'replies',
          populate: 'replies'
        }
      });

    return NextResponse.json(
      formatMessage(populatedMessage),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update like count
export async function PUT(request) {
  try {
    const { messageId } = await request.json();
    
    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    await ConnectMongo();
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate({
      path: 'replies',
      populate: {
        path: 'replies',
        populate: 'replies'
      }
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatMessage(message), { status: 200 });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}