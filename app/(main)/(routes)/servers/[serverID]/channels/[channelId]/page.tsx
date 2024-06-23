import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

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
      <ChatMessages
        member = {member}
        name = {channel.Name}
        chatId={channel.id}
        type = "channel"
        apiUrl = "/api/messages"
        socketUrl = "/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }} 
        paramKey="channelId"
        paramValue={channel.id}
      />
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