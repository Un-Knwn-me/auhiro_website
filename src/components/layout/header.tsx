"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

const products = {
  eScooters: [
    {
      name: "Motovolt M7",
      slug: "city-cruiser",
      tagline: "Urban Mobility Redefined",
      variants: "2 Variants",
      price: "₹65,000",
    },
    {
      name: "Motovolt HUM",
      slug: "thunder-max",
      tagline: "Maximum Performance",
      variants: "3 Variants",
      price: "₹75,000",
    },
  ],
  eCycles: [
    {
      name: "Motovolt URBN",
      slug: "eco-rider",
      tagline: "Green Commuting",
      variants: "1 Variant",
      price: "₹45,000",
    },
    {
      name: "Motovolt ICE",
      slug: "fold-and-go",
      tagline: "Compact & Portable",
      variants: "1 Variant",
      price: "₹55,000",
    },
  ],
  eMopeds: [
    {
      name: "Motovolt KIVO",
      slug: "sport-moped",
      tagline: "Power Meets Style",
      variants: "1 Variant",
      price: "₹95,000",
    },
  ],
};

const baseNavClass =
  "font-[family-name:var(--font-display)] text-[14px] font-medium uppercase tracking-wider transition-colors hover:text-[#EA4E21]";

const mobileNavBase =
  "font-[family-name:var(--font-display)] text-base font-medium uppercase tracking-wider transition-colors hover:text-[#EA4E21]";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const navLinkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `${baseNavClass} ${isActive ? "text-[#EA4E21]" : "text-white/90"}`;
  };

  const mobileNavClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `${mobileNavBase} py-3 border-b border-gray-100 ${isActive ? "text-[#EA4E21]" : "text-gray-700"}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 pt-3 pb-1">
      <div className="relative">
        {/* Floating dark glass navbar */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-full shadow-2xl border border-white/10">
          <div className="flex h-16 items-center justify-between px-5 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base">A</span>
              </div>
              <div>
                <span className="font-bold text-lg tracking-wide text-white">
                  AUHIRO <span className="text-orange-400">MOTORS</span>
                </span>
                <p className="text-[9px] tracking-[0.15em] text-white/50 -mt-0.5 italic">
                  relax &middot; recharge &middot; accelerate
                </p>
              </div>
            </Link>

            {/* Desktop Navigation + CTA - right aligned */}
            <div className="hidden lg:flex items-center gap-8 ml-auto">
              <nav className="flex items-center gap-8">
                <Link href="/" className={navLinkClass("/")}>
                  Home
                </Link>

                {/* Products Dropdown Trigger */}
                <div
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button className={`flex items-center gap-1 ${navLinkClass("/products")}`}>
                    Products
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        isProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <Link href="/gallery" className={navLinkClass("/gallery")}>
                  Gallery
                </Link>
                <Link href="/blog" className={navLinkClass("/blog")}>
                  Blog
                </Link>
                <Link href="/about" className={navLinkClass("/about")}>
                  About Us
                </Link>
              </nav>

              <Button size="lg" className="px-8" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
                <div className="flex items-center gap-2.5 mb-8 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-gray-800">
                      AUHIRO <span className="text-orange-500">MOTORS</span>
                    </span>
                  </div>
                </div>
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavClass("/")}
                  >
                    Home
                  </Link>

                  {/* Mobile Products Accordion */}
                  <div className="border-b border-gray-100">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`flex items-center justify-between w-full ${mobileNavBase} py-3 ${pathname.startsWith("/products") ? "text-[#EA4E21]" : "text-gray-700"}`}
                    >
                      Products
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileProductsOpen && (
                      <div className="pb-4 space-y-4">
                        <div>
                          <p className="text-xs font-bold text-orange-500 uppercase mb-2">
                            E-Scooters
                          </p>
                          {products.eScooters.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 pl-4 text-gray-600 hover:text-orange-500"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-orange-500 uppercase mb-2">
                            E-Cycles
                          </p>
                          {products.eCycles.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 pl-4 text-gray-600 hover:text-orange-500"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-orange-500 uppercase mb-2">
                            E-Mopeds
                          </p>
                          {products.eMopeds.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 pl-4 text-gray-600 hover:text-orange-500"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/gallery"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavClass("/gallery")}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavClass("/blog")}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavClass("/about")}
                  >
                    About Us
                  </Link>

                  <div className="pt-4">
                    <Button
                      className="w-full"
                      asChild
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Full Width Mega Menu */}
        <div
          className={`absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-white/50 transition-all duration-300 ${
            isProductsOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
          onMouseEnter={() => setIsProductsOpen(true)}
          onMouseLeave={() => setIsProductsOpen(false)}
        >
          <div className="p-8">
            <div className="grid grid-cols-4 gap-8">
              {/* E-Scooters */}
              <div>
                <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4 pb-2 border-b border-orange-100">
                  E-Scooters
                </h3>
                <div className="space-y-4">
                  {products.eScooters.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="block group"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-orange-200 group-hover:to-yellow-200 transition-colors">
                          <Zap className="h-8 w-8 text-orange-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">{product.tagline}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-orange-500">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-400">
                              • {product.variants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* E-Cycles */}
              <div>
                <h3 className="text-sm font-bold text-green-500 uppercase tracking-wider mb-4 pb-2 border-b border-green-100">
                  E-Cycles
                </h3>
                <div className="space-y-4">
                  {products.eCycles.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="block group"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                          <Zap className="h-8 w-8 text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">{product.tagline}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-orange-500">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-400">
                              • {product.variants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* E-Mopeds */}
              <div>
                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-4 pb-2 border-b border-blue-100">
                  E-Mopeds
                </h3>
                <div className="space-y-4">
                  {products.eMopeds.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="block group"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                          <Zap className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">{product.tagline}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-orange-500">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-400">
                              • {product.variants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Can&apos;t Decide?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Visit our showroom and test ride all models. Our experts will help you find the perfect EV.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/contact" onClick={() => setIsProductsOpen(false)}>
                    Book Test Ride
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
