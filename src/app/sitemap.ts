import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auhiromotors.com";

  // Static pages
  const staticPages = [
    "",
    "/products",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Product pages (will be dynamic from DB in production)
  const productSlugs = [
    "city-cruiser",
    "eco-rider",
    "sport-moped",
    "fold-and-go",
    "thunder-max",
  ];

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Blog pages (will be dynamic from DB in production)
  const blogSlugs = [
    "why-evs-are-future",
    "e-scooter-maintenance-guide",
    "ev-subsidies-india-2024",
    "e-cycle-vs-e-scooter",
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
