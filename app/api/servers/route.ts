import {v4 as uuidv4} from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST (req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {Name : "general", profileId: profile.id} //N capital because i mistyped that in the schema and cant be bothered updating the db
                    ]
                }, 
                members: {
                    create: [
                        {profileId: profile.id, role : MemberRole.ADMIN}
                    ]
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVERS_POST] ", error);
        return new NextResponse("Internal Error", { status:500 });
    }
}