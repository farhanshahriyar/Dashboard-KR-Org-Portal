import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "kr_admin" | "kr_manager" | "kr_member";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  canAccess: (feature: string) => boolean;
  getRoleDisplay: () => string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const featurePermissions = {
  kr_admin: ["*"], // All access
  kr_manager: [
    "dashboard",
    "announcement",
    "attendance",
    "noc",
    "members",
    "tournaments",
    "schedule",
    "update_logs",
  ],
  kr_member: [
    "dashboard",
    "announcement.view",
    "attendance",
    "noc",
    "members.view",
    "tournaments.view",
    "schedule",
    "update_logs",
  ],
};

const roleDisplayNames = {
  kr_admin: "KR Admin",
  kr_manager: "KR Manager",
  kr_member: "KR Member",
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("kr_member");

  const canAccess = (feature: string) => {
    if (role === "kr_admin") return true;
    const permissions = featurePermissions[role] || [];
    return permissions.includes(feature) || permissions.includes(feature.split(".")[0]);
  };

  const getRoleDisplay = () => {
    return roleDisplayNames[role];
  };

  return (
    <RoleContext.Provider value={{ role, setRole, canAccess, getRoleDisplay }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}