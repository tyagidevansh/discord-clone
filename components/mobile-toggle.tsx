import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { NavigationSidebar } from "./navigation/navigation-sidebar"
import { ServerSidebar } from "./server/server-sidebar"

export const MobileToggle = ({
  serverID
}:{
  serverID: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant = "ghost" size = "icon" className="md:hidden">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side = "left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar/>
        </div>
        <ServerSidebar serverId={serverID}/>
      </SheetContent>
    </Sheet>
  )
}