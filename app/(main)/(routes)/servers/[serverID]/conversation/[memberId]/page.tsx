import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface MemberIdPageProps {
  params: {
    memberId: string;
    serverID: string;
  }
}

const MemberIdPage = async ({
  params
}: MemberIdPageProps) => {
  const profile = await currentProfile();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverID,
      profileId: profile?.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/servers/${params.serverID}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile?.id ? memberTwo : memberOne;


  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
          Name={otherMember.profile.name}
          serverID={params.serverID}
          type = "conversation"
      />
    </div>
  );
}
 
export default MemberIdPage;