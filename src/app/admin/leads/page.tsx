"use client";

import { useState } from "react";
import { Eye, Phone, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Placeholder leads data
const leads = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    product: "City Cruiser",
    source: "WEBSITE_FORM",
    status: "NEW",
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    product: "Thunder Max",
    source: "WHATSAPP",
    status: "CONTACTED",
    createdAt: "2024-01-15T08:15:00",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    product: "Eco Rider",
    source: "WEBSITE_FORM",
    status: "QUALIFIED",
    createdAt: "2024-01-14T16:45:00",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 65432 10987",
    product: "City Cruiser Pro",
    source: "WEBSITE_FORM",
    status: "NEW",
    createdAt: "2024-01-14T14:20:00",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 54321 09876",
    product: "Thunder Max Plus",
    source: "PHONE",
    status: "CONVERTED",
    createdAt: "2024-01-13T11:00:00",
  },
];

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  NEW: "default",
  CONTACTED: "secondary",
  QUALIFIED: "outline",
  CONVERTED: "default",
  CLOSED: "destructive",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = statusFilter === "all"
    ? leads
    : leads.filter((lead) => lead.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage customer inquiries</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="QUALIFIED">Qualified</SelectItem>
            <SelectItem value="CONVERTED">Converted</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-sm text-muted-foreground">New Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">10</div>
            <p className="text-sm text-muted-foreground">Follow Up Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-sm text-muted-foreground">Converted</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product Interest</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm hover:text-primary">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </a>
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{lead.product}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lead.source.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Mark as Qualified
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Mark as Converted
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
