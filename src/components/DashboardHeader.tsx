import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sun, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { NotificationsButton } from "@/components/ui/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function DashboardHeader() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userFullName, setUserFullName] = useState<string>("");
  const [userInitials, setUserInitials] = useState<string>("--");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // added avatarUrl state

  // without avatarUrl functionality
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (user) {
  //       setUserEmail(user.email || "");

  //       // Fetch profile data
  //       const { data: profile } = await supabase
  //         .from('profiles')
  //         .select('full_name')
  //         .eq('id', user.id)
  //         .single();

  //       if (profile?.full_name) {
  //         setUserFullName(profile.full_name);
  //         const initials = profile.full_name
  //           .split(' ')
  //           .map((n: string) => n[0])
  //           .join('')
  //           .toUpperCase();
  //         setUserInitials(initials);
  //       }
  //     }
  //   };

  //   fetchUserProfile();

  //   // Listen for realtime changes to the profile
  //   const channel = supabase
  //     .channel('profile_changes')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'UPDATE',
  //         schema: 'public',
  //         table: 'profiles',
  //         filter: `id=eq.${supabase.auth.getUser().then(({ data }) => data.user?.id)}`,
  //       },
  //       async (payload) => {
  //         if (payload.new.full_name) {
  //           setUserFullName(payload.new.full_name);
  //           const initials = payload.new.full_name
  //             .split(' ')
  //             .map((n: string) => n[0])
  //             .join('')
  //             .toUpperCase();
  //           setUserInitials(initials);
  //         }
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, []);



  // with avatarUrl functionality
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");

        // Fetch profile data
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")  // Fetch both full_name and avatar_url
          .eq("id", user.id)
          .single();

        if (profile) {
          if (profile.full_name) {
            setUserFullName(profile.full_name);
            const initials = profile.full_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase();
            setUserInitials(initials);
          }

          // Set avatar URL
          if (profile.avatar_url) {
            setAvatarUrl(profile.avatar_url); // Fetch and set the avatar URL from profile
          }
        }
      }
    };

    fetchUserProfile();

    // Listen for real-time changes to the profile
    const channel = supabase
      .channel("profile_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${supabase.auth.getUser().then(({ data }) => data.user?.id)}`,
        },
        async (payload) => {
          if (payload.new.full_name) {
            setUserFullName(payload.new.full_name);
            const initials = payload.new.full_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase();
            setUserInitials(initials);
          }

          // Update avatar if changed
          if (payload.new.avatar_url) {
            setAvatarUrl(payload.new.avatar_url);  // Update the avatar URL on real-time changes
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  // Mock search results - replace with actual data later
  const searchResults = [
    {
      group: "Pages",
      items: [
        { title: "Dashboard", href: "/" },
        { title: "Attendance", href: "/attendance" },
        { title: "NOC List", href: "/noc" },
        { title: "Members", href: "/members" },
        { title: "Update Logs", href: "/update-logs" },
      ],
    },
    {
      group: "Recent Updates",
      items: [
        { title: "Attendance Report", href: "/attendance" },
        { title: "New NOC Request", href: "/noc" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger />

        <div className="flex-1 ml-4">
          <Button
            variant="outline"
            className="relative h-9 w-full justify-start max-w-sm text-sm text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>

          <NotificationsButton />

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-sm font-medium">{userEmail}</span>
                    <Avatar>
                      {/* <AvatarImage src="/placeholder.svg" /> */}
                      <AvatarImage src={avatarUrl || "/placeholder.svg"} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account settings</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/auth");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    setOpen(false);
                    navigate(item.href);
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
}
