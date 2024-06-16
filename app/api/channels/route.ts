import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      console.error("Unauthorized: No profile found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { Name, type } = await req.json();
    
    if (!Name || !type) {
      console.error("Bad Request: Name or type missing in request body");
      return new NextResponse("Bad Request: Name or type missing", { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      console.error("Bad Request: Server ID missing");
      return new NextResponse("Bad Request: Server ID missing", { status: 400 });
    }

    if (Name === "general") {
      console.error("Bad Request: Invalid channel name 'general'");
      return new NextResponse("Bad Request: Name cannot be 'general'", { status: 400 });
    }

    console.log("Profile ID:", profile.id);
    console.log("Channel Name:", Name);
    console.log("Channel Type:", type);
    console.log("Server ID:", serverId);

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            Name,
            type,
          },
        },
      },
      include: {
        channels: true,
      },
    });

    return NextResponse.json(server);

  } catch (error) {
    console.error("Internal Server Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
