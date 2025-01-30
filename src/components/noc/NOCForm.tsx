import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NOCForm = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with Supabase later
    console.log({ selectedDays, reason, message });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit NOC Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason:</label>
            <Input
              placeholder="e.g., Family Issue"
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
              className="min-h-[150px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit NOC
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NOCForm;