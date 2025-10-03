// app/api/arcjet/route.ts
import { aj } from "@/lib/arcjet"; // adjust path based on tsconfig paths
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = "user123"; // Replace with your authenticated user ID
  const decision = await aj.protect(req, { userId, requested: 5 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}
