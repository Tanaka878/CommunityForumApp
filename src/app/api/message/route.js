import { NextResponse } from "next/server";
import ConnectMongo from "../../libs/mongodb";
import Message from "../../components/Model/Message";

// GET: Fetch messages for a community
export async function GET(request) {
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
    const messages = await Message.find({ communityId })
      .populate("replies")
      .sort({ time: 1 })
      .lean();

    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      sender: msg.sender,
      text: msg.text,
      time: msg.time.toISOString(),
      likes: msg.likes,
      replies: msg.replies.map((reply) => ({
        id: reply._id.toString(),
        sender: reply.sender,
        text: reply.text, // Full reply text
        time: reply.time.toISOString(),
      })),
      mentions: msg.mentions,
      tags: msg.tags,
    }));

    return NextResponse.json(formattedMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new message or a reply
export async function POST(request) {
  try {
    const { sender, text, communityId, mentions, tags, parentMessageId } =
      await request.json();

    if (!sender || !text || !communityId) {
      return NextResponse.json(
        { error: "Sender, text, and communityId are required" },
        { status: 400 }
      );
    }

    await ConnectMongo();

    // Check if this is a reply
    let parentMessage = null;
    if (parentMessageId) {
      parentMessage = await Message.findById(parentMessageId);
      if (!parentMessage) {
        return NextResponse.json(
          { error: "Parent message not found" },
          { status: 404 }
        );
      }
    }

    // Create the new message or reply
    const message = await Message.create({
      sender,
      text,
      communityId,
      mentions,
      tags,
      time: new Date(),
      createdAt: new Date(),
    });

    if (parentMessage) {
      parentMessage.replies.push(message._id); // Add reply ID to parent message
      await parentMessage.save();
    }

    return NextResponse.json(
      {
        message: "Message sent",
        data: {
          id: message._id.toString(),
          sender: message.sender,
          text: message.text,
          time: message.time.toISOString(),
          likes: message.likes,
          replies: [],
          mentions: message.mentions,
          tags: message.tags,
          parentMessage: parentMessage
            ? {
                id: parentMessage._id.toString(),
                text: parentMessage.text,
              }
            : null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
