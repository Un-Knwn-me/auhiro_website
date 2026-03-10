import { Metadata } from "next";
import Image from "next/image";
import { Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore our showroom, events, and product gallery. See Auhiro Motors electric vehicles in action.",
};

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
  { id: "9", title: "Night Showroom", category: "showroom" },
  { id: "10", title: "E-Scooter Line", category: "products" },
  { id: "11", title: "Launch Event", category: "events" },
  { id: "12", title: "Accessories Display", category: "showroom" },
];

const categories = [
  { value: "all", label: "All" },
  { value: "showroom", label: "Showroom" },
  { value: "products", label: "Products" },
  { value: "events", label: "Events" },
];

export default function GalleryPage() {
  return (
    <div className="container py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a visual tour of our showroom, products, and events. See what makes Auhiro Motors special.
        </p>
      </div>

      {/* Gallery Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems
                .filter((item) => category.value === "all" || item.category === category.value)
                .map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square relative bg-muted rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <Zap className="h-12 w-12" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-white/70 capitalize">{item.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
