"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Placeholder products data
const products = [
  {
    id: "1",
    name: "City Cruiser",
    category: "E_SCOOTER",
    basePrice: 65000,
    variants: 2,
    status: "active",
  },
  {
    id: "2",
    name: "Eco Rider",
    category: "E_CYCLE",
    basePrice: 45000,
    variants: 1,
    status: "active",
  },
  {
    id: "3",
    name: "Sport Moped",
    category: "E_MOPED",
    basePrice: 95000,
    variants: 1,
    status: "active",
  },
  {
    id: "4",
    name: "Fold & Go",
    category: "E_CYCLE",
    basePrice: 55000,
    variants: 1,
    status: "active",
  },
  {
    id: "5",
    name: "Thunder Max",
    category: "E_SCOOTER",
    basePrice: 75000,
    variants: 3,
    status: "active",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    E_SCOOTER: "E-Scooter",
    E_CYCLE: "E-Cycle",
    E_MOPED: "E-Moped",
  };
  return labels[category] || category;
}

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.basePrice)}</TableCell>
                  <TableCell>{product.variants} variant(s)</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "active" ? "default" : "secondary"}>
                      {product.status}
                    </Badge>
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
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Variants
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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
