import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Make sure this is a server component
export const metadata = {
    title: 'Server Layout',
}

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverID: string };
}) => {
    console.log('params:', params); // Debug statement to check params

    const profile = await currentProfile();

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverID,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (!server) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverID} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
};

export default ServerIdLayout;
