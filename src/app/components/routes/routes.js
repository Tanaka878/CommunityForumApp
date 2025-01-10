import { NextResponse } from "next/server";
import ConnectMongo from "../../libs/mongodb";
import Topic from "../../models/Topic";



export async function POST(request) {
  try {
    // Parse incoming request data
    const { title, description } = await request.json();
    if (!title || !description) {
      return NextResponse.json(
        { error: "Both title and description are required" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    await ConnectMongo();
    console.log("Connected to MongoDB!");

    // Create a new topic
    const topic = await Topic.create({ title, description });
    console.log("Topic created:", topic);

    return NextResponse.json({ message: "Topic created", topic }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
