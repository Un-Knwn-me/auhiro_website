"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Battery,
  Shield,
  Droplets,
  Gauge,
  ChevronDown,
  ChevronUp,
  Zap,
  Settings,
  Clock,
  Weight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Vehicle models data
const vehiclesData: Record<string, any> = {
  "city-cruiser": {
    id: "1",
    name: "Motovolt M7",
    slug: "city-cruiser",
    tagline: "Urban Mobility Redefined",
    description:
      "The Motovolt M7 is designed for the modern urban commuter. With its sleek design, powerful motor, and impressive range, it's the perfect companion for navigating city streets.",
    category: "E_SCOOTER",
    basePrice: 65000,
    highlights: [
      { icon: Battery, label: "LFP BATTERY TECHNOLOGY" },
      { icon: Shield, label: "AIS-156 CERTIFIED" },
      { icon: Droplets, label: "IP-67 WATER & DUST RESISTANCE" },
      { icon: Gauge, label: "CBS WITH REGENERATIVE BRAKING" },
    ],
    features: {
      performance: [
        "Powerful 250W BLDC Motor",
        "Top Speed of 25 km/h",
        "Smooth acceleration",
        "Hill climb capability",
      ],
      battery: [
        "48V 20Ah Lithium-ion Battery",
        "60 km range per charge",
        "4-5 hours charging time",
        "Battery management system",
      ],
      comfort: [
        "Ergonomic seating",
        "Spacious footboard",
        "Under-seat storage",
        "LED display console",
      ],
      safety: [
        "Disc brakes front & rear",
        "LED headlamp & tail lamp",
        "Turn indicators",
        "Anti-theft alarm",
      ],
    },
    specifications: {
      motor: "250W BLDC",
      battery: "48V 20Ah Li-ion",
      range: "60 km",
      topSpeed: "25 km/h",
      chargingTime: "4-5 hours",
      weight: "55 kg",
      maxLoad: "150 kg",
      wheelSize: "12 inch",
      brakes: "Disc (F) / Drum (R)",
      suspension: "Telescopic (F) / Dual Shock (R)",
    },
    variants: [
      {
        id: "v1",
        name: "Standard",
        price: 65000,
        colors: [
          { name: "Sunshine Yellow", hexCode: "#FBBF24" },
          { name: "Midnight Black", hexCode: "#1a1a1a" },
          { name: "Pearl White", hexCode: "#f5f5f5" },
          { name: "Racing Red", hexCode: "#dc2626" },
        ],
      },
      {
        id: "v2",
        name: "Pro",
        price: 85000,
        colors: [
          { name: "Sunshine Yellow", hexCode: "#FBBF24" },
          { name: "Midnight Black", hexCode: "#1a1a1a" },
          { name: "Ocean Blue", hexCode: "#2563eb" },
          { name: "Forest Green", hexCode: "#16a34a" },
        ],
      },
    ],
  },
  "thunder-max": {
    id: "2",
    name: "Motovolt HUM",
    slug: "thunder-max",
    tagline: "Maximum Performance",
    description:
      "The Motovolt HUM is our flagship e-scooter, designed for those who demand the best performance and range.",
    category: "E_SCOOTER",
    basePrice: 75000,
    highlights: [
      { icon: Battery, label: "LFP BATTERY TECHNOLOGY" },
      { icon: Shield, label: "AIS-156 CERTIFIED" },
      { icon: Droplets, label: "IP-67 WATER & DUST RESISTANCE" },
      { icon: Gauge, label: "CBS WITH REGENERATIVE BRAKING" },
    ],
    features: {
      performance: [
        "Powerful 500W BLDC Motor",
        "Top Speed of 45 km/h",
        "Instant torque delivery",
        "Multiple riding modes",
      ],
      battery: [
        "60V 30Ah Lithium-ion Battery",
        "100 km range per charge",
        "Fast charging support",
        "Swappable battery option",
      ],
      comfort: [
        "Premium seating",
        "Digital instrument cluster",
        "Mobile app connectivity",
        "Cruise control",
      ],
      safety: [
        "Dual disc brakes",
        "ABS system",
        "GPS tracking",
        "Remote immobilizer",
      ],
    },
    specifications: {
      motor: "500W BLDC",
      battery: "60V 30Ah Li-ion",
      range: "100 km",
      topSpeed: "45 km/h",
      chargingTime: "5-6 hours",
      weight: "70 kg",
      maxLoad: "180 kg",
      wheelSize: "14 inch",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F) / Mono Shock (R)",
    },
    variants: [
      { id: "v1", name: "Lite", price: 75000, colors: [{ name: "Storm Grey", hexCode: "#4b5563" }, { name: "Black", hexCode: "#18181b" }] },
      { id: "v2", name: "Plus", price: 95000, colors: [{ name: "Yellow", hexCode: "#FBBF24" }, { name: "Black", hexCode: "#18181b" }, { name: "Blue", hexCode: "#3b82f6" }] },
      { id: "v3", name: "Max", price: 115000, colors: [{ name: "Yellow", hexCode: "#FBBF24" }, { name: "Black", hexCode: "#18181b" }, { name: "Red", hexCode: "#dc2626" }, { name: "Gold", hexCode: "#ca8a04" }] },
    ],
  },
  "eco-rider": {
    id: "3",
    name: "Motovolt URBN",
    slug: "eco-rider",
    tagline: "Green Commuting Solution",
    description: "Perfect e-cycle for eco-conscious commuters who want efficiency and style.",
    category: "E_CYCLE",
    basePrice: 45000,
    highlights: [
      { icon: Battery, label: "LFP BATTERY TECHNOLOGY" },
      { icon: Shield, label: "AIS-156 CERTIFIED" },
      { icon: Droplets, label: "IP-67 WATER & DUST RESISTANCE" },
      { icon: Gauge, label: "PEDAL ASSIST SYSTEM" },
    ],
    features: {
      performance: ["250W Hub Motor", "25 km/h top speed", "5-level pedal assist", "Smooth gear shifting"],
      battery: ["36V 10Ah Li-ion", "50 km range", "3-4 hours charging", "Removable battery"],
      comfort: ["Ergonomic saddle", "Adjustable handlebar", "Front suspension", "Lightweight frame"],
      safety: ["V-brakes", "LED lights", "Reflectors", "Bell included"],
    },
    specifications: { motor: "250W Hub", battery: "36V 10Ah", range: "50 km", topSpeed: "25 km/h", chargingTime: "3-4 hours", weight: "22 kg", maxLoad: "120 kg", wheelSize: "26 inch", brakes: "V-Brakes", suspension: "Front Fork" },
    variants: [{ id: "v1", name: "Standard", price: 45000, colors: [{ name: "Black", hexCode: "#1f1f1f" }, { name: "Silver", hexCode: "#c0c0c0" }, { name: "Blue", hexCode: "#3b82f6" }] }],
  },
  "sport-moped": {
    id: "4",
    name: "Motovolt KIVO",
    slug: "sport-moped",
    tagline: "Power Meets Style",
    description: "High-performance e-moped for those who demand power and range.",
    category: "E_MOPED",
    basePrice: 95000,
    highlights: [
      { icon: Battery, label: "LFP BATTERY TECHNOLOGY" },
      { icon: Shield, label: "AIS-156 CERTIFIED" },
      { icon: Droplets, label: "IP-67 WATER & DUST RESISTANCE" },
      { icon: Gauge, label: "CBS WITH REGENERATIVE BRAKING" },
    ],
    features: {
      performance: ["500W BLDC Motor", "45 km/h top speed", "Instant torque", "Sport mode"],
      battery: ["60V 30Ah Li-ion", "100 km range", "Fast charging", "BMS protected"],
      comfort: ["Premium seat", "Digital console", "Mobile charging", "Boot space"],
      safety: ["Dual disc brakes", "LED DRLs", "Side stand sensor", "Anti-theft"],
    },
    specifications: { motor: "500W BLDC", battery: "60V 30Ah", range: "100 km", topSpeed: "45 km/h", chargingTime: "5-6 hours", weight: "75 kg", maxLoad: "180 kg", wheelSize: "12 inch", brakes: "Disc (F&R)", suspension: "Dual Shock" },
    variants: [{ id: "v1", name: "Standard", price: 95000, colors: [{ name: "Black", hexCode: "#0a0a0a" }, { name: "Red", hexCode: "#dc2626" }, { name: "Blue", hexCode: "#2563eb" }] }],
  },
  "fold-and-go": {
    id: "5",
    name: "Motovolt ICE",
    slug: "fold-and-go",
    tagline: "Compact & Portable",
    description: "The ultimate foldable e-cycle for last-mile connectivity.",
    category: "E_CYCLE",
    basePrice: 55000,
    highlights: [
      { icon: Battery, label: "LFP BATTERY TECHNOLOGY" },
      { icon: Shield, label: "COMPACT DESIGN" },
      { icon: Droplets, label: "IP-67 WATER RESISTANCE" },
      { icon: Gauge, label: "FOLDABLE FRAME" },
    ],
    features: {
      performance: ["350W Hub Motor", "25 km/h top speed", "Quick fold mechanism", "Lightweight"],
      battery: ["48V 10Ah Li-ion", "40 km range", "3-4 hours charging", "Removable"],
      comfort: ["Compact 14\" wheels", "Carry bag included", "Adjustable seat", "Rear suspension"],
      safety: ["Disc brakes", "LED lights", "Reflectors", "Horn"],
    },
    specifications: { motor: "350W Hub", battery: "48V 10Ah", range: "40 km", topSpeed: "25 km/h", chargingTime: "3-4 hours", weight: "18 kg", maxLoad: "100 kg", wheelSize: "14 inch", brakes: "Disc", suspension: "Rear" },
    variants: [{ id: "v1", name: "Standard", price: 55000, colors: [{ name: "Black", hexCode: "#1c1c1c" }, { name: "White", hexCode: "#f8f8f8" }, { name: "Orange", hexCode: "#f97316" }] }],
  },
};

// FAQ data
const faqs = [
  {
    question: "How can I book a test ride?",
    answer: "You can book a test ride directly through our website. Simply visit the 'Book a Test Ride' section, fill in your details, and our team will get in touch to schedule your ride at your convenience.",
  },
  {
    question: "What is the range of Motosoft e-cycles and e-scooters?",
    answer: "The range of our cycles and e-scooters varies by model but typically cycle ranges from 35 to 100+ km on a single charge and scooter up to 140+ km. Detailed specifications for each model are available on the product pages.",
  },
  {
    question: "What warranty do Motosoft products come with?",
    answer: "Motosoft products come with a standard warranty that covers manufacturing defects. Typically Motosoft provides 2 years warranty on vehicle and 3 years on battery.",
  },
  {
    question: "How can I get my Motosoft product serviced?",
    answer: "Motosoft provides doorstep service and maintenance options. You can book a service appointment through our website or contact our support team for assistance.",
  },
  {
    question: "Are there any mobile apps available for Motosoft products?",
    answer: "Yes, Motosoft offers a mobile app that allows you to track your vehicle, monitor battery status, plan routes, and access other smart features. The app is available for download on both iOS and Android platforms.",
  },
  {
    question: "Can I ride my e-cycle in the monsoons?",
    answer: "Yes, you can ride your e-cycle in the monsoons. Our batteries are IP-67 certified rain and dust resistant.",
  },
  {
    question: "How long does it take to recharge the battery?",
    answer: "Depends on the battery size and charger you are using. It usually takes anywhere between 3 to 6 hours.",
  },
  {
    question: "How to track an e-cycle in case of theft/forgotten location?",
    answer: "The Smart plus series comes with an inbuilt GPS that provides live location of the cycle if the cycle's battery is in power.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = vehiclesData[params.slug];
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!vehicle) {
    notFound();
  }

  const currentVariant = vehicle.variants[selectedVariant];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-pink-100 via-pink-50 to-white py-8 lg:py-16">
        <div className="container">
          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="relative h-80 lg:h-[500px] flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl flex items-center justify-center">
                <Zap className="h-40 w-40 text-yellow-400" />
              </div>
            </div>

            {/* Product Info */}
            <div className="text-center lg:text-left">
              <Badge className="bg-orange-500 text-white mb-4">
                {vehicle.category.replace("_", "-")}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {vehicle.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{vehicle.tagline}</p>
              <p className="text-gray-500 mb-6">{vehicle.description}</p>

              {/* Variants */}
              {vehicle.variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Select Variant:</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {vehicle.variants.map((variant: any, index: number) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(index);
                          setSelectedColor(0);
                        }}
                        className={`px-4 py-2 rounded-full border-2 transition-all ${
                          selectedVariant === index
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  Color: {currentVariant.colors[selectedColor]?.name}
                </p>
                <div className="flex gap-3 justify-center lg:justify-start">
                  {currentVariant.colors.map((color: any, index: number) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        selectedColor === index
                          ? "border-orange-500 scale-110"
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-orange-500">
                  {formatPrice(currentVariant.price)}
                </div>
                <p className="text-sm text-gray-500">Ex-showroom price</p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="px-8"
                  asChild
                >
                  <Link href="/contact">Book a Test Drive</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#EA4E21] text-[#EA4E21] hover:bg-orange-50 px-8"
                  asChild
                >
                  <Link href="/contact">Get Price Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Model Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why <span className="text-orange-500">{vehicle.name}</span>?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vehicle.highlights.map((highlight: any, index: number) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <highlight.icon className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-xs font-medium text-gray-700">{highlight.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Performance</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center"
                >
                  <Gauge className="h-12 w-12 text-gray-300" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Powerful & Efficient</h3>
              <ul className="space-y-3">
                {vehicle.features.performance.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Section */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Battery</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Long Lasting Power</h3>
              <ul className="space-y-3">
                {vehicle.features.battery.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center"
                >
                  <Battery className="h-12 w-12 text-orange-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comfort & Practicality Section */}
      <section className="py-12 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Comfort & Practicality
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-orange-100 rounded-xl flex items-center justify-center">
              <Settings className="h-16 w-16 text-pink-300" />
            </div>
            <div>
              <ul className="space-y-3">
                {vehicle.features.comfort.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ride & Build Quality Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Ride & Build Quality
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center"
              >
                <Zap className="h-16 w-16 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart & Safety Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Smart & Safety Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-3">
                {vehicle.features.safety.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center"
                >
                  <Shield className="h-12 w-12 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Full Specifications
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-medium text-gray-800">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions <span className="text-orange-500">(FAQ)</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  openFaq === index ? "border-orange-300 shadow-md" : ""
                }`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  {openFaq === index && (
                    <p className="text-gray-600 mt-4 text-sm">{faq.answer}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Ride the {vehicle.name}?
          </h2>
          <p className="mb-8 opacity-90">
            Book a test ride today and experience the future of mobility.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8"
            asChild
          >
            <Link href="/contact">Book a Test Drive</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
