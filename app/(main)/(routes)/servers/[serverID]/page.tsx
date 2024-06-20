import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverID: string;
    }
};

const ServerIdPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await currentProfile();
    const server = await db.server.findUnique({
        where: {
            id: params.serverID,
            members: {
                some: {
                    profileId: profile?.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    Name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const initialChannel = server?.channels[0];

    if (initialChannel?.Name !== "general") {
        return null;
    }
    
    return redirect(`/servers/${params.serverID}/channels/${initialChannel?.id}`)
}
 
export default ServerIdPage;