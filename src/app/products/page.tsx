import { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Vehicles | Auhiro Motors",
  description:
    "Explore our range of premium Motosoft electric vehicles - E-Scooters, E-Cycles, and E-Mopeds.",
};

const products = {
  eScooters: [
    {
      name: "Motovolt M7",
      slug: "city-cruiser",
      tagline: "Urban Mobility Redefined",
      price: "₹65,000",
      variants: "2 Variants",
      color: "from-orange-100 to-yellow-100",
      iconColor: "text-orange-400",
    },
    {
      name: "Motovolt HUM",
      slug: "thunder-max",
      tagline: "Maximum Performance",
      price: "₹75,000",
      variants: "3 Variants",
      color: "from-orange-100 to-yellow-100",
      iconColor: "text-orange-400",
    },
  ],
  eCycles: [
    {
      name: "Motovolt URBN",
      slug: "eco-rider",
      tagline: "Green Commuting Solution",
      price: "₹45,000",
      variants: "1 Variant",
      color: "from-green-100 to-emerald-100",
      iconColor: "text-green-400",
    },
    {
      name: "Motovolt ICE",
      slug: "fold-and-go",
      tagline: "Compact & Portable",
      price: "₹55,000",
      variants: "1 Variant",
      color: "from-green-100 to-emerald-100",
      iconColor: "text-green-400",
    },
  ],
  eMopeds: [
    {
      name: "Motovolt KIVO",
      slug: "sport-moped",
      tagline: "Power Meets Style",
      price: "₹95,000",
      variants: "1 Variant",
      color: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-400",
    },
  ],
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-500">Electric Vehicles</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete range of Motosoft electric two-wheelers.
            From city commutes to weekend adventures, find the perfect ride for your lifestyle.
          </p>
        </div>
      </section>

      {/* E-Scooters */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <span className="text-orange-500">E-Scooters</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {products.eScooters.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div
                        className={`w-40 h-40 bg-gradient-to-br ${product.color} flex items-center justify-center`}
                      >
                        <Zap className={`h-16 w-16 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{product.tagline}</p>
                        <p className="text-orange-500 font-bold text-lg mb-1">
                          {product.price} <span className="text-gray-400 text-sm font-normal">onwards</span>
                        </p>
                        <p className="text-xs text-gray-400">{product.variants}</p>
                        <div className="mt-4 flex items-center text-orange-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* E-Cycles */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <span className="text-green-500">E-Cycles</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {products.eCycles.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div
                        className={`w-40 h-40 bg-gradient-to-br ${product.color} flex items-center justify-center`}
                      >
                        <Zap className={`h-16 w-16 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{product.tagline}</p>
                        <p className="text-orange-500 font-bold text-lg mb-1">
                          {product.price} <span className="text-gray-400 text-sm font-normal">onwards</span>
                        </p>
                        <p className="text-xs text-gray-400">{product.variants}</p>
                        <div className="mt-4 flex items-center text-orange-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* E-Mopeds */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <span className="text-blue-500">E-Mopeds</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {products.eMopeds.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div
                        className={`w-40 h-40 bg-gradient-to-br ${product.color} flex items-center justify-center`}
                      >
                        <Zap className={`h-16 w-16 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{product.tagline}</p>
                        <p className="text-orange-500 font-bold text-lg mb-1">
                          {product.price} <span className="text-gray-400 text-sm font-normal">onwards</span>
                        </p>
                        <p className="text-xs text-gray-400">{product.variants}</p>
                        <div className="mt-4 flex items-center text-orange-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Decide?</h2>
          <p className="mb-8 opacity-90">
            Book a test ride and experience all our models at our showroom.
          </p>
          <Button size="lg" variant="secondary" className="px-8" asChild>
            <Link href="/contact">Book a Test Ride</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
