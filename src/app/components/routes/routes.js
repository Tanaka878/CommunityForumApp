import { NextResponse } from "next/server";
import ConnectMongo from "../../libs/mongodb";
import Message from "../../models/Message"; // Assuming you have a Message model.

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
      .sort({ time: 1 });  // Sort by time (oldest to newest)

    console.log("Messages fetched:", messages);
    return NextResponse.json(messages, { status: 200 });
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
      createdAt: new Date(),
    });
    console.log("Message created:", message);

    return NextResponse.json({ message: "Message sent", message }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
