import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useRole } from "@/contexts/RoleContext";
import { RoleFeaturesDropdown } from "./sidebar/RoleFeaturesDropdown";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";

export function DashboardSidebar() {
  const { getRoleDisplay } = useRole();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex flex-col">
              <span className="text-[15px]">KingsRock Portal</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal opacity-70">{getRoleDisplay()}</span>
                <RoleFeaturesDropdown />
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarNavigation />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}