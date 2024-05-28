import { paginationUtil } from "@/lib";
import { connectToDatabase } from "@/lib/database";
import PostModel from "@/lib/database/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// CRUD operations
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const payload = await request.json();

    const { name, color, capacity } = payload;

    const newPost = await PostModel.create({
      name,
      color,
      capacity,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const page = Number(searchParams.get("page")) || 1;
    const perpage = Number(searchParams.get("perpage")) || 9;

    const [posts, total] = await Promise.all([
      PostModel.find()
        .sort({ createdAt: -1 })
        .lean(true)
        .limit(perpage)
        .skip(page * perpage - perpage),

      PostModel.aggregate([{ $count: "count" }]),
    ]);

    const pagination = paginationUtil({
      page,
      perpage,
      total: total[0]?.count!,
    });

    return NextResponse.json({ status: 200, pagination, posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
