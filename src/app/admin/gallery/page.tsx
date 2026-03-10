"use client";

import { Plus, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Placeholder gallery data
const galleryItems = [
  { id: "1", title: "Showroom Display", category: "showroom" },
  { id: "2", title: "City Cruiser Launch", category: "events" },
  { id: "3", title: "Thunder Max Pro", category: "products" },
  { id: "4", title: "Customer Delivery", category: "events" },
  { id: "5", title: "Service Center", category: "showroom" },
  { id: "6", title: "E-Cycle Range", category: "products" },
  { id: "7", title: "Test Ride Event", category: "events" },
  { id: "8", title: "Premium Collection", category: "products" },
];

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage gallery images</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="showroom">Showroom</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Total Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Showroom</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Events</p>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="aspect-square relative bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Zap className="h-12 w-12" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 capitalize">
                {item.category}
              </Badge>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
