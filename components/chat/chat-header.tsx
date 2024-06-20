import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";

interface ChatHeaderProps {
  serverID: string;
  Name: string;
  type : "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverID,
  Name,
  type,
  imageUrl
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverID={serverID}/>
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {Name}
      </p>
    </div>
  )
}