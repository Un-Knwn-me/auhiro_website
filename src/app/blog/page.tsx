import { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay updated with the latest news, tips, and insights about electric vehicles and sustainable mobility.",
};

// Placeholder blog data
const blogs = [
  {
    id: "1",
    title: "Why Electric Vehicles Are the Future of Transportation",
    slug: "why-evs-are-future",
    excerpt: "Discover the environmental, economic, and practical benefits of switching to electric vehicles for your daily commute.",
    author: "Auhiro Team",
    publishedAt: "2024-01-15",
    tags: ["EV Benefits", "Sustainability"],
  },
  {
    id: "2",
    title: "Complete Guide to E-Scooter Maintenance",
    slug: "e-scooter-maintenance-guide",
    excerpt: "Learn how to properly maintain your e-scooter to ensure longevity, safety, and optimal performance.",
    author: "Technical Team",
    publishedAt: "2024-01-10",
    tags: ["Maintenance", "Tips"],
  },
  {
    id: "3",
    title: "Government Subsidies for Electric Vehicles in India 2024",
    slug: "ev-subsidies-india-2024",
    excerpt: "A comprehensive guide to all the subsidies and incentives available for EV buyers across different states.",
    author: "Auhiro Team",
    publishedAt: "2024-01-05",
    tags: ["Subsidies", "Policy"],
  },
  {
    id: "4",
    title: "Comparing E-Cycles vs E-Scooters: Which is Right for You?",
    slug: "e-cycle-vs-e-scooter",
    excerpt: "A detailed comparison to help you choose between an e-cycle and e-scooter based on your needs.",
    author: "Product Team",
    publishedAt: "2024-01-01",
    tags: ["Comparison", "Buying Guide"],
  },
  {
    id: "5",
    title: "How to Extend Your E-Vehicle Battery Life",
    slug: "extend-ev-battery-life",
    excerpt: "Practical tips and best practices to maximize your electric vehicle's battery life and performance.",
    author: "Technical Team",
    publishedAt: "2023-12-28",
    tags: ["Battery", "Tips"],
  },
  {
    id: "6",
    title: "The Rise of Electric Mobility in Urban India",
    slug: "electric-mobility-urban-india",
    excerpt: "Exploring how electric vehicles are transforming urban transportation across Indian cities.",
    author: "Auhiro Team",
    publishedAt: "2023-12-20",
    tags: ["Urban Mobility", "India"],
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="container py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay informed with the latest news, tips, and insights about electric vehicles and sustainable mobility.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              </div>
              <Button variant="link" asChild className="p-0 mt-4">
                <Link href={`/blog/${blog.slug}`}>
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
