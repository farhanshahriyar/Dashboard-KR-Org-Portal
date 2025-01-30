import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  {
    id: 1,
    title: "New NOC Request",
    message: "John Doe has submitted a new NOC request",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Update Log Added",
    message: "A new update log has been added to the system",
    time: "5 hours ago",
    read: true,
  },
];

export function NotificationsButton() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>View notifications</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-background" : "bg-muted"
                }`}
              >
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {notification.time}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}