import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface ChannelIdPageProps {
  params: {
    serverID: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await currentProfile();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverID,
      profileId: profile?.id,
    }
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverID = {channel.serverId}
        Name = {channel.Name}
        type = "channel"
      />
      <div className="flex-1">Future Messages</div>
      <ChatInput 
        name = {channel.Name}
        type = "channel"
        apiUrl="/api/socket/messages"
        query = {{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
}

export default ChannelIdPage;