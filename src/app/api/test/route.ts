import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: 'MongoDB connected successfully' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return new Response(
      JSON.stringify({ message: 'MongoDB connection failed' }),
      { status: 500 }
    );
  }
}
