import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ThemeProvider } from "next-themes";
import { RoleProvider } from "@/contexts/RoleContext";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Attendance from "./pages/Attendance";
import NOC from "./pages/NOC";
import Members from "./pages/Members";
import Announcement from "./pages/Announcement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TournamentsMatches from "./pages/TournamentsMatches";
import Schedule from "./pages/Schedule";
import RequestSchedule from "./pages/RequestSchedule";
import UpdateLogs from "./pages/UpdateLogs";
import AddUpdateLogs from "./pages/AddUpdateLogs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      meta: {
        onError: (error: Error) => {
          toast.error("An error occurred", {
            description: error.message,
          });
        },
      },
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" attribute="class">
        <TooltipProvider>
          <RoleProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="flex min-h-screen w-full">
                        <DashboardSidebar />
                        <div className="flex-1 flex flex-col">
                          <DashboardHeader />
                          <main className="flex-1 p-4">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/announcement" element={<Announcement />} />
                              <Route path="/attendance" element={<Attendance />} />
                              <Route path="/noc" element={<NOC />} />
                              <Route path="/members" element={<Members />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/tournaments-matches" element={<TournamentsMatches />} />
                              <Route path="/schedule" element={<Schedule />} />
                              <Route path="/request-schedule" element={<RequestSchedule />} />
                              <Route path="/update-logs" element={<UpdateLogs />} />
                              <Route path="/add-updatelogs" element={<AddUpdateLogs />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </RoleProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;