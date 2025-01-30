import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This will be replaced with actual data from Supabase later
const mockNocs = [
  {
    id: 1,
    reason: "Family Issue",
    message: "Away bye ajh, So I cant join........",
  },
];

const NOCList = () => {
  const handleEdit = (id: number) => {
    // Will be implemented with Supabase later
    console.log("Edit NOC:", id);
  };

  const handleDelete = (id: number) => {
    // Will be implemented with Supabase later
    console.log("Delete NOC:", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your NOC Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>NOC Reason</TableHead>
              <TableHead>NOC Message</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNocs.map((noc, index) => (
              <TableRow key={noc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{noc.reason}</TableCell>
                <TableCell>{noc.message}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(noc.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(noc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NOCList;