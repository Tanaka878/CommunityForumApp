import { NextResponse } from "next/server";
import ConnectMongo from "../../libs/mongodb";
import Message from "../../models/Message"; // Ensure this is the correct path

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
    console.log("Connecting to MongoDB...");
    await ConnectMongo();
    console.log("Connected to MongoDB!");

    const messages = await Message.find({ communityId })
      .populate("replies") // Fetch nested replies
      .sort({ time: 1 })  // Sort by time (oldest to newest)
      .lean(); // Return plain objects for better performance

    // Map the messages to include the id field for consistency
    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(), // MongoDB _id to id
      sender: msg.sender,
      text: msg.text,
      time: msg.time.toISOString(),
      likes: msg.likes,
      replies: msg.replies.map((reply) => ({
        id: reply._id.toString(),
        sender: reply.sender,
        text: reply.text,
        time: reply.time.toISOString(),
      })),
      mentions: msg.mentions,
      tags: msg.tags,
    }));

    console.log("Messages fetched:", formattedMessages);
    return NextResponse.json(formattedMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { sender, text, communityId, mentions, tags } = await request.json();

    if (!sender || !text || !communityId) {
      return NextResponse.json(
        { error: "Sender, text, and communityId are required" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    await ConnectMongo();
    console.log("Connected to MongoDB!");

    // Create a new message
    const message = await Message.create({
      sender,
      text,
      communityId,
      mentions,
      tags,
      time: new Date(), // Ensure time is correctly set
      createdAt: new Date(),
    });

    console.log("Message created:", message);

    // Return the newly created message with the id
    return NextResponse.json({
      message: "Message sent",
      message: {
        id: message._id.toString(),
        sender: message.sender,
        text: message.text,
        time: message.time.toISOString(),
        likes: message.likes,
        replies: [],
        mentions: message.mentions,
        tags: message.tags,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Route to like a message
export async function POST_LIKE(request) {
  const { id } = request.query; // Message ID to like

  try {
    await ConnectMongo();
    const message = await Message.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment likes count
      { new: true }
    );

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
