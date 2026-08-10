import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const subscriber = await prisma.emailSubscriber.create({
      data: {
        email: email.trim().toLowerCase(),
        name: typeof name === "string" ? name.trim() : null,
        source: typeof source === "string" ? source : "hero_lead_magnet",
      },
    });

    return NextResponse.json({ success: true, subscriberId: subscriber.id });
  } catch (error) {
    console.error("Error creating email subscriber:", error);
    return NextResponse.json(
      { error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
