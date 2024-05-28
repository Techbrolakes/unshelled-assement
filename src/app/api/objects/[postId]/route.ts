import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import PostModel from "@/lib/database/models/post.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectToDatabase();

    const post = await PostModel.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectToDatabase();

    const payload = await request.json();

    const { color, capacity, name } = payload;

    const post = await PostModel.findByIdAndUpdate(
      { _id: params.postId },
      {
        color,
        capacity,
        name,
      },
      {
        new: true,
      }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectToDatabase();

    const post = await PostModel.findByIdAndDelete(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
