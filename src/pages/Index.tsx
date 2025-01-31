import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - replace with actual data later
const mockChartData = [
  { date: 'Jun 1', Mobile: 40, Desktop: 24 },
  { date: 'Jun 3', Mobile: 30, Desktop: 13 },
  { date: 'Jun 5', Mobile: 20, Desktop: 98 },
  { date: 'Jun 7', Mobile: 27, Desktop: 39 },
  { date: 'Jun 9', Mobile: 18, Desktop: 48 },
  { date: 'Jun 11', Mobile: 23, Desktop: 38 },
  { date: 'Jun 13', Mobile: 34, Desktop: 43 },
  { date: 'Jun 15', Mobile: 34, Desktop: 77 },
  { date: 'Jun 17', Mobile: 23, Desktop: 65 },
  { date: 'Jun 19', Mobile: 34, Desktop: 43 },
  { date: 'Jun 21', Mobile: 25, Desktop: 55 },
  { date: 'Jun 23', Mobile: 44, Desktop: 35 },
  { date: 'Jun 25', Mobile: 32, Desktop: 46 },
  { date: 'Jun 27', Mobile: 14, Desktop: 37 },
  { date: 'Jun 30', Mobile: 23, Desktop: 43 },
];

const Index = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch user profile data from Supabase
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, full_name")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserName(profile.username);
          setUserFullName(profile.full_name);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Function to get the greeting name
  const getGreetingName = () => {
    return userName || userFullName || "KR Member";
  };

  // Memoize static data to prevent unnecessary re-renders
  const stats = useMemo(() => [
    {
      title: "Total Present (Last Month)",
      value: "85%",
      icon: Calendar,
      description: "Average attendance rate",
    },
    {
      title: "Roster Members",
      value: "12",
      icon: Users,
      description: "Active team members",
    },
    {
      title: "NOC Requests",
      value: "3",
      icon: FileText,
      description: "Pending approvals",
    },
  ], []);

  const recentUpdates = useMemo(() => [
    {
      type: "Attendance",
      content: "Team achieved 90% attendance this week",
      timestamp: "2 hours ago"
    },
    {
      type: "NOC",
      content: "2 new NOC requests pending approval",
      timestamp: "5 hours ago"
    },
    {
      type: "Member",
      content: "Monthly attendance report generated",
      timestamp: "1 day ago"
    }
  ], []);

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-7xl">
      <div className="mb-8">
        {/* Dynamic Greeting */}
        <h1 className="text-2xl font-bold mb-2">Hi, {getGreetingName()}</h1>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Attendance Overview</CardTitle>
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Mobile"
                  stackId="1"
                  stroke="#FF69B4"
                  fill="#FFB6C1"
                />
                <Area
                  type="monotone"
                  dataKey="Desktop"
                  stackId="1"
                  stroke="#FF1493"
                  fill="#FF69B4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{update.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {update.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
