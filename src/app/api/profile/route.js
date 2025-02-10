// Server-side Next.js API Route
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import UserData from '../../components/Model/UserData/UserData';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: 'userId query parameter is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const userData = await UserData.findOne({ userId });

    if (!userData) {
      return NextResponse.json({ error: 'upload an image' }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}

export async function POST(request) {
  const { userId, ImageData } = await request.json();

  if (!userId || !ImageData) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await connectDB();

    const existingUserData = await UserData.findOne({ userId });
    if (existingUserData) {
      existingUserData.ImageData = ImageData;
      await existingUserData.save();
      return NextResponse.json({ message: 'Image updated successfully' });
    } else {
      const newUserData = new UserData({ userId, ImageData });
      await newUserData.save();
      return NextResponse.json({ message: 'Image uploaded successfully' });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
  }
}
