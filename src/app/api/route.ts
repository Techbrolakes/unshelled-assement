import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ status: 200, message: "Hello World" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
