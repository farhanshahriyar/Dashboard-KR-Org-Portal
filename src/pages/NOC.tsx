import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This will be replaced with actual data from Supabase later
const mockNocRequests = [
  {
    id: "NOC-001",
    submittedDate: "2024-01-22",
    reason: "Medical Leave",
    requestedDays: "Jan 25-27, 2024",
    status: "pending",
    message: "Need to undergo medical procedure",
  },
  {
    id: "NOC-002",
    submittedDate: "2024-01-20",
    reason: "Family Emergency",
    requestedDays: "Jan 23-24, 2024",
    status: "approved",
    message: "Family medical emergency",
  },
  {
    id: "NOC-003",
    submittedDate: "2024-01-18",
    reason: "Personal Leave",
    requestedDays: "Jan 21, 2024",
    status: "rejected",
    message: "Personal commitment",
  },
];

const NOC = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with Supabase later
    console.log({ selectedDays, reason, message });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
      <Badge
        className={`${
          statusStyles[status as keyof typeof statusStyles]
        } capitalize`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NOC Requests</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add NOC
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit NOC Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason:</label>
                <Input
                  placeholder="e.g., Medical Leave"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Days for NOC:</label>
                <Calendar
                  mode="multiple"
                  selected={selectedDays}
                  onSelect={setSelectedDays as any}
                  className="border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message:</label>
                <Textarea
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit NOC
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Requested Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNocRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.submittedDate}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.requestedDays}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {request.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NOC;