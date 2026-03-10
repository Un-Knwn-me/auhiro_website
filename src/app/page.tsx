"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Shield,
  Award,
  Wrench,
  CreditCard,
  RefreshCw,
  Car,
  ChevronDown,
  ChevronUp,
  Zap,
  Battery,
  CheckCircle,
  Users,
  Headphones,
  FileCheck,
  Fuel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site";

// EV Models with specifications for savings calculator
const evModels = [
  {
    id: "city-cruiser",
    name: "Motovolt M7",
    category: "E-Scooter",
    range: 100, // km per charge
    batteryCapacity: 2.5, // kWh
    chargingCost: 8, // Rs per kWh (average electricity cost)
  },
  {
    id: "thunder-max",
    name: "Motovolt HUM",
    category: "E-Scooter",
    range: 140,
    batteryCapacity: 3.0,
    chargingCost: 8,
  },
  {
    id: "eco-rider",
    name: "Motovolt URBN",
    category: "E-Cycle",
    range: 60,
    batteryCapacity: 0.5,
    chargingCost: 8,
  },
  {
    id: "fold-and-go",
    name: "Motovolt ICE",
    category: "E-Cycle",
    range: 45,
    batteryCapacity: 0.4,
    chargingCost: 8,
  },
  {
    id: "sport-moped",
    name: "Motovolt KIVO",
    category: "E-Moped",
    range: 120,
    batteryCapacity: 2.8,
    chargingCost: 8,
  },
];

// Vehicle data for showcase
const vehicles = [
  {
    name: "City Cruiser",
    slug: "city-cruiser",
    image: "/images/vehicles/city-cruiser.png",
    color: "#F97316",
  },
  {
    name: "Thunder Max",
    slug: "thunder-max",
    image: "/images/vehicles/thunder-max.png",
    color: "#EAB308",
  },
  {
    name: "Eco Rider",
    slug: "eco-rider",
    image: "/images/vehicles/eco-rider.png",
    color: "#22C55E",
  },
  {
    name: "Sport Moped",
    slug: "sport-moped",
    image: "/images/vehicles/sport-moped.png",
    color: "#F97316",
  },
  {
    name: "Fold & Go",
    slug: "fold-and-go",
    image: "/images/vehicles/fold-and-go.png",
    color: "#3B82F6",
  },
];

// Support services
const supportServices = [
  {
    icon: Users,
    title: "SALES",
    description:
      "Our stylish, energy-efficient Motosoft electric scooters are available in Coimbatore. Our team helps you choose the perfect model of Motosoft electric scooter with easy range, quick charge, and smart features.",
  },
  {
    icon: Car,
    title: "FREE TEST DRIVE",
    description:
      "Feel the power of Motosoft electric scooter for yourself! Book a free test drive today at Auhiro Motors and feel the silent acceleration, long EV of batteries, and eco-friendly mobility before buying your next electric scooter in Coimbatore.",
  },
  {
    icon: CreditCard,
    title: "FINANCE",
    description:
      "Own your dream of a Motosoft electric scooter with easy financing options at Auhiro Motors. Select flexible EMI plans, low-interest loans, and budget-friendly payments for the Coimbatore customer who is in urgent need of eco-friendly electric mobility.",
  },
  {
    icon: RefreshCw,
    title: "EXCHANGE",
    description:
      "Trade Upgrade to a new Motosoft electric scooter over here. Make in your old bike or scooter for an attractive exchange offer at Auhiro Motors and save a lot while shifting to an eco-friendly electric two-wheeler in Coimbatore.",
  },
  {
    icon: FileCheck,
    title: "INSURANCE RENEWAL",
    description:
      "Avail easy renewal of your electric scooter insurance at Auhiro Motors. Get quick competitive quotes for unparalleled renewal to keep you protected on the roads of Coimbatore with comprehensive coverage for your Motosoft scooter.",
  },
  {
    icon: Wrench,
    title: "SERVICE",
    description:
      "Keep your Motosoft electric scooter in prime running condition through our professional service center in Coimbatore. Enjoy speed maintenance with genuine parts and authentic repairs for a long-lasting, and efficient electric scooter.",
  },
];

// FAQ data
const faqs = [
  {
    question: "How can I book a test ride?",
    answer:
      "You can book a test ride directly through our website. Simply visit the 'Book a Test Ride' section, fill in your details, and our team will get in touch to schedule your ride at your convenience.",
  },
  {
    question: "What is the range of Motosoft e-cycles and e-scooters?",
    answer:
      "The range of our cycles and e-scooters varies by model but typically cycle ranges from 35 to 100+ km on a single charge and scooter up to 140+ km. Detailed specifications for each model are available on the product pages.",
  },
  {
    question: "What warranty do Motosoft products come with?",
    answer:
      "Motosoft products come with a standard warranty that covers manufacturing defects. Typically Motosoft provides 2 years warranty on vehicle and 3 years on battery.",
  },
  {
    question: "How can I get my Motosoft product serviced?",
    answer:
      "Motosoft provides doorstep service and maintenance options. You can book a service appointment through our website or contact our support team for assistance.",
  },
  {
    question: "Are there any mobile apps available for Motosoft products?",
    answer:
      "Yes, Motosoft offers a mobile app that allows you to track your vehicle, monitor battery status, plan routes, and access other smart features. Plus models and above come with app connectivity.",
  },
  {
    question: "Can I ride my e-cycle in the monsoons?",
    answer:
      "Yes, you can ride your e-cycle in the monsoons. Our batteries are IP67 certified rain and dust resistant. However, we recommend avoiding deep water puddles.",
  },
  {
    question: "How long does it take to recharge the battery?",
    answer:
      "Depends on the battery size and charger you are using. It usually takes anywhere between 3 to 6 hours for a full charge.",
  },
  {
    question: "How to turn on e-cycle in case of theft/forgetting location?",
    answer:
      "The Smart plus series comes with an inbuilt GPS that provides live location of the cycle if the cycle's battery is in power.",
  },
];

export default function HomePage() {
  const [dailyUsage, setDailyUsage] = useState([30]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState(evModels[0].id);
  const [petrolMileage, setPetrolMileage] = useState("50"); // km per liter
  const [petrolPrice, setPetrolPrice] = useState(101.74); // Default petrol price

  // Fetch current petrol price (fallback to default if API fails)
  useEffect(() => {
    // Note: In production, you would fetch from a reliable API
    // For now, using the default price of 101.74
    // Example API call (commented out as most require API keys):
    // fetch('https://api.example.com/fuel-prices/india')
    //   .then(res => res.json())
    //   .then(data => setPetrolPrice(data.petrol))
    //   .catch(() => setPetrolPrice(101.74));
  }, []);

  // Get selected model data
  const currentModel = evModels.find((m) => m.id === selectedModel) || evModels[0];

  // Calculate savings
  const userMileage = parseFloat(petrolMileage) || 50; // User's petrol vehicle mileage (km/L)
  const monthlyKm = dailyUsage[0] * 30;

  // Petrol cost calculation
  const petrolLitersNeeded = monthlyKm / userMileage;
  const monthlyPetrolCost = Math.round(petrolLitersNeeded * petrolPrice);

  // EV charging cost calculation
  const chargesNeeded = monthlyKm / currentModel.range;
  const kWhNeeded = chargesNeeded * currentModel.batteryCapacity;
  const monthlyChargingCost = Math.round(kWhNeeded * currentModel.chargingCost);

  const monthlySavings = monthlyPetrolCost - monthlyChargingCost;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] py-12 lg:py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-bg.png)" }}
      >
        {/* Overlay for text readability while keeping vehicles visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
        <div className="container relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-medium text-gray-900 mb-6">
              Ride the Future with Electric Two-wheelers
              <br />
              <span className="text-orange-500">by Auhiro Motors, India</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl font-light mx-auto mb-8">
              Switch to MOTOVOLT to experience smooth, fuel-free rides while combining smart technology, low running costs, and eco-friendly mobility that ensures a seamless riding experience.<br />
              Relax into the ride that recharges your journey to move confidently towards sustainability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="px-8"
                asChild
              >
                <Link href="/contact">
                  <Car className="mr-2 h-5 w-5" />
                  Book a Test Drive
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-black/20 backdrop-blur-2xl border border-white/10 text-black hover:text-white hover:bg-black/30 px-8"
                asChild
              >
                <Link href={siteConfig.links.whatsapp} target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Let's Talk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Range Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            New Range for New <span className="text-orange-500">India</span>
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/products/${vehicle.slug}`}
                className="flex-shrink-0 snap-center group"
              >
                <div className="w-64 h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <Zap
                    className="h-20 w-20 text-gray-300 group-hover:text-orange-400 transition-colors"
                  />
                </div>
                <p className="text-center mt-3 font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                  {vehicle.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Built Safe Section - Background image: add bg-built-safe or style with your hexagonal pattern */}
      <section className="py-16 bg-stone-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            Built <span className="text-orange-500">Safe</span>. Built{" "}
            <span className="text-orange-500">Smart</span>. Built for India.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Text Content (8/12) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2 text-gray-900">
                  Safety First — Motovolt&apos;s Advanced EV Battery
                </h3>
                <p>
                  At Motovolt Mobility, safety isn&apos;t an add-on – it&apos;s the foundation of our battery technology. Our state-of-the-art EV battery is engineered to deliver maximum protection, long life, and consistent performance in every ride.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2 text-gray-900">Built for Real-World Safety</h3>
                <ul className="text-base text-gray-600 font-light antialiased tracking-normal space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-[#EA4E21] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>
                      <strong className="text-gray-900">Fire-Resistant</strong> – <span className="font-light">Designed with advanced materials to greatly minimize fire risk.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-[#EA4E21] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>
                      <strong className="text-gray-900">Water-Resistant</strong> – <span className="font-light">Performs reliably even in heavy rain and harsh weather.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-[#EA4E21] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>
                      <strong className="text-gray-900">Dust-Resistant</strong> – <span className="font-light">Protects internal components for longer battery life and efficiency.</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2 text-gray-900">Certified Protection</h3>
                <p>
                  With IP67 certification, the battery is fully sealed against dust and can withstand water immersion – ensuring dependable performance in every environment.
                </p>
              </div>

              <Button size="lg" className="px-8 mt-4" asChild>
                <Link href="/contact">
                  <Car className="mr-2 h-5 w-5" />
                  Book a Test Drive
                </Link>
              </Button>
            </div>

            {/* Right Column - Image placeholder (4/12) */}
            <div className="lg:col-span-5 relative h-80 lg:h-400px] bg-orange-100 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Add your image: <Image src="/images/built-safe-battery.jpg" alt="..." fill className="object-cover rounded-2xl" /> */}
              <Zap className="h-32 w-32 text-orange-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Auhiro Motors Section */}
      <section className="py-16 bg-stone-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose <span className="text-orange-500">Auhiro Motors</span>?
          </h2>

          <div className="grid lg:grid-cols-[7fr_5fr] gap-6">
            {/* Left column - 2 cards (7/12) */}
            <div className="flex flex-col gap-6">
              {/* Premium Electric Scooters */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-gray-100 p-6">
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <h3 className="font-bold text-base uppercase tracking-wider text-gray-900 mb-3">
                        PREMIUM ELECTRIC SCOOTERS
                      </h3>
                      <p className="text-gray-600 text-sm">
                        At Auhiro, we present you with the best Motovolt models available in the market, focusing on efficiency, performance, and designs.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-md">
                        <p className="text-xs text-gray-600 mb-1">Upto</p>
                        <p className="text-2xl font-bold text-gray-900">₹25,000+</p>
                        <p className="text-xs text-gray-500 mb-3">40 kms daily</p>
                        <Button size="sm" className="text-xs px-4 py-2" asChild>
                          <Link href="/contact">Annual savings</Link>
                        </Button>
                      </div>
                      <div className="relative h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-xl flex items-end p-3">
                        <svg className="absolute inset-0 w-full h-full opacity-30 rounded-xl" preserveAspectRatio="none">
                          <polyline points="0,60 30,50 60,55 90,35 120,40 150,25 180,30 210,15 240,10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                        </svg>
                        <span className="text-white/80 text-xs">Jan</span>
                        <span className="text-white/80 text-xs ml-auto">Dec</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Green & Sustainable Mobility - orange */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-6 min-h-[160px]">
                <h3 className="font-bold text-base uppercase tracking-wider text-white mb-3">
                  GREEN & SUSTAINABLE MOBILITY
                </h3>
                <p className="text-white/90 text-sm">
                  Ride with caution and help make a pollution-free India while enjoying premium mileage and comfort.
                </p>
              </div>
            </div>

            {/* Right column - 3 cards */}
            <div className="flex flex-col gap-6">
              {/* Exceptional Customer Experience - split layout */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6">
                    <h3 className="font-bold text-base uppercase tracking-wider text-gray-900 mb-3">
                      EXCEPTIONAL CUSTOMER EXPERIENCE
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our client&apos;s satisfaction is our priority. Right from selection to after-sales service, we make your journey seamless.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-6 flex items-center justify-center min-h-[120px]">
                    <div className="flex flex-col gap-2">
                      <div className="w-16 h-16 rounded-full bg-white/20" />
                      <div className="w-14 h-14 rounded-full bg-white/20 ml-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Services - light */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 p-6 min-h-[120px]">
                <h3 className="font-bold text-base uppercase tracking-wider text-gray-900 mb-3">
                  COMPREHENSIVE SERVICES
                </h3>
                <p className="text-gray-600 text-sm">
                  Extensive Services With easy financing options, hassle-free insurance, and excellent servicing, you can rely on us.
                </p>
              </div>

              {/* Experience Before You Buy - orange */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-6 min-h-[120px]">
                <h3 className="font-bold text-base uppercase tracking-wider text-white mb-3">
                  EXPERIENCE BEFORE YOU BUY
                </h3>
                <p className="text-white/90 text-sm">
                  Wanting an electric vehicle but not sure if you want to make the switch? Take a free test ride to see for yourself the benefit of innovation, quick acceleration, and easy handling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-4">
            Full <span className="text-orange-500">support</span>, from start to finish
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We provide complete support throughout your electric vehicle journey
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-lg mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculate Your Savings Section */}
      <section className="py-16 bg-orange-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-4">
            Calculate Your <span className="text-orange-500">Savings</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            See how much you can save by switching to electric. Compare your current petrol costs with our EV models.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Select Model & Vehicle Info */}
              <Card className="lg:col-span-1">
                <CardContent className="p-6 space-y-6">
                  {/* Model Selection */}
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      SELECT EV MODEL
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {evModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div className="flex items-center gap-2">
                              <span>{model.name}</span>
                              <span className="text-xs text-gray-400">({model.category})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Battery className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-600">Range:</span>
                        <span className="font-semibold text-orange-600">{currentModel.range} km/charge</span>
                      </div>
                    </div>
                  </div>

                  {/* Your Vehicle Mileage */}
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      YOUR VEHICLE MILEAGE
                    </label>
                    <div className="relative">
                      <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="number"
                        value={petrolMileage}
                        onChange={(e) => setPetrolMileage(e.target.value)}
                        placeholder="Enter km/liter"
                        className="pl-10"
                        min="1"
                        max="100"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Average mileage of your current petrol vehicle (km/L)
                    </p>
                  </div>

                  {/* Petrol Price */}
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Petrol Price</span>
                      <span className="font-bold text-red-600">₹{petrolPrice.toFixed(2)}/L</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Coimbatore, Tamil Nadu</p>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Slider */}
              <Card className="lg:col-span-1">
                <CardContent className="p-6">
                  <h3 className="font-bold text-sm text-gray-700 mb-6">YOUR DAILY TRAVEL</h3>
                  <div className="mb-8">
                    <Slider
                      value={dailyUsage}
                      onValueChange={setDailyUsage}
                      min={5}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>5 KM</span>
                      <span>100 KM</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Daily distance</div>
                    <div className="text-5xl font-bold text-orange-500 my-2">{dailyUsage[0]}</div>
                    <div className="text-gray-600">KM / day</div>
                  </div>
                  <div className="mt-6 pt-4 border-t text-center">
                    <div className="text-sm text-gray-500">Monthly travel</div>
                    <div className="text-xl font-semibold text-gray-700">{monthlyKm.toLocaleString()} KM</div>
                  </div>
                </CardContent>
              </Card>

              {/* Savings Display */}
              <Card className="lg:col-span-1 border-2 border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-sm text-gray-700 mb-6">YOUR SAVINGS</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Monthly Petrol Cost</span>
                          <p className="text-xs text-gray-400">{(monthlyKm / userMileage).toFixed(1)}L × ₹{petrolPrice.toFixed(2)}</p>
                        </div>
                        <span className="text-xl font-bold text-red-500">
                          ₹{monthlyPetrolCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Monthly Charging Cost</span>
                          <p className="text-xs text-gray-400">{kWhNeeded.toFixed(1)} kWh × ₹{currentModel.chargingCost}</p>
                        </div>
                        <span className="text-xl font-bold text-green-500">
                          ₹{monthlyChargingCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
                      <div className="text-sm opacity-90 mb-1">Monthly Savings</div>
                      <div className="text-3xl font-bold">
                        ₹{monthlySavings.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-500">
                        Annual Savings
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{(monthlySavings * 12).toLocaleString()}
                      </p>
                    </div>
                    <Button className="w-full mt-2" asChild>
                      <Link href={`/products/${selectedModel}`}>
                        View {currentModel.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
                    <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-orange-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
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
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Go Electric?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Visit our showroom today and experience the future of mobility.
            Book a test ride and feel the difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="px-8"
              asChild
            >
              <Link href="/contact">Book a Test Drive</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 px-8"
              asChild
            >
              <Link href={siteConfig.links.whatsapp} target="_blank">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
