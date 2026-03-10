import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Image, FileText, Users, TrendingUp, Eye } from "lucide-react";

// Placeholder stats (will be fetched from API)
const stats = [
  { title: "Total Products", value: "5", icon: Package, change: "+2 this month" },
  { title: "Gallery Items", value: "12", icon: Image, change: "+4 this week" },
  { title: "Blog Posts", value: "6", icon: FileText, change: "+1 this week" },
  { title: "New Leads", value: "24", icon: Users, change: "+8 today" },
];

const recentLeads = [
  { id: "1", name: "Rahul Sharma", phone: "+91 98765 43210", product: "City Cruiser", date: "2 hours ago" },
  { id: "2", name: "Priya Patel", phone: "+91 87654 32109", product: "Thunder Max", date: "5 hours ago" },
  { id: "3", name: "Amit Kumar", phone: "+91 76543 21098", product: "Eco Rider", date: "Yesterday" },
  { id: "4", name: "Sneha Reddy", phone: "+91 65432 10987", product: "City Cruiser Pro", date: "Yesterday" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest inquiries from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{lead.phone}</p>
                    <p className="text-xs text-muted-foreground">{lead.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center gap-3 p-4">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Add Product</p>
                  <p className="text-xs text-muted-foreground">Create new product</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center gap-3 p-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">New Blog Post</p>
                  <p className="text-xs text-muted-foreground">Write article</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center gap-3 p-4">
                <Image className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Upload Images</p>
                  <p className="text-xs text-muted-foreground">Add to gallery</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center gap-3 p-4">
                <Eye className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">View Site</p>
                  <p className="text-xs text-muted-foreground">Preview website</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
