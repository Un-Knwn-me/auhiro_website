import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Car,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/lead-form";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Book Test Ride | Visit Showroom",
  description:
    "Book a test ride, visit our showroom, or get a price quote for Auhiro Motors electric vehicles. Contact us today!",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Showroom Address",
    description: siteConfig.contact.address,
    subtext: "Open for walk-ins",
    action: "Get Directions",
    href: "https://maps.google.com/?q=123+EV+Street+Green+Park+New+Delhi",
  },
  {
    icon: Phone,
    title: "Sales Enquiry",
    description: siteConfig.contact.phone,
    subtext: "For price quotes & bookings",
    action: "Call Now",
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    description: siteConfig.contact.email,
    subtext: "We reply within 24 hours",
    action: "Send Email",
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Clock,
    title: "Showroom Hours",
    description: "Mon - Sat: 10:00 AM - 8:00 PM",
    subtext: "Sunday: 11:00 AM - 6:00 PM",
    action: null,
    href: null,
  },
];

const quickActions = [
  {
    icon: Calendar,
    title: "Book Test Ride",
    description: "Experience the ride before you decide",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: Car,
    title: "Visit Showroom",
    description: "See all models in person",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Get Price Quote",
    description: "Best prices with exclusive offers",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              We&apos;re Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Visit Our Showroom
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Book a test ride, get a price quote, or simply visit us to explore
              our complete range of electric vehicles. Our experts are ready to
              assist you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call +91 98765 43210
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                asChild
              >
                <Link href={siteConfig.links.whatsapp} target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="container -mt-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className={`${action.color} hover:shadow-lg transition-shadow`}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div
                  className={`p-3 rounded-full bg-white/80 ${action.iconColor}`}
                >
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enquiry Form */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Book Test Ride / Get Quote
                </CardTitle>
                <CardDescription>
                  Fill out the form below and our team will contact you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="enquiry">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="enquiry">Vehicle Enquiry</TabsTrigger>
                    <TabsTrigger value="contact">General Contact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="enquiry">
                    <LeadForm />
                  </TabsContent>
                  <TabsContent value="contact">
                    <ContactForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item) => (
                <Card key={item.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-1">{item.description}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.subtext}
                    </p>
                    {item.action && item.href && (
                      <Button variant="link" asChild className="p-0 h-auto">
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                        >
                          {item.action} →
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Card className="bg-green-50 border-green-200 mb-8">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    Instant WhatsApp Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get quick responses on WhatsApp for any queries
                  </p>
                </div>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href={siteConfig.links.whatsapp} target="_blank">
                    Chat Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What to Expect at Our Showroom</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Hands-on experience with all vehicle models",
                    "Expert guidance on choosing the right EV",
                    "Test ride on your preferred model",
                    "Detailed price breakdown with offers",
                    "Easy financing options & EMI calculation",
                    "Trade-in evaluation for your old vehicle",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Map */}
            <div>
              <h3 className="font-semibold mb-4">Find Our Showroom</h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">Auhiro Motors Showroom</p>
                    <p className="text-sm">123 EV Street, Green Park</p>
                    <p className="text-sm">New Delhi - 110016</p>
                    <Button variant="link" className="mt-2" asChild>
                      <a
                        href="https://maps.google.com/?q=123+EV+Street+Green+Park+New+Delhi"
                        target="_blank"
                      >
                        Open in Google Maps →
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How do I book a test ride?",
                a: "You can book a test ride by filling out the form above, calling us, or sending a WhatsApp message. Walk-ins are also welcome during showroom hours.",
              },
              {
                q: "What documents do I need to bring?",
                a: "For a test ride, just bring a valid driving license. For purchase, you'll need ID proof, address proof, and photos. Our team will guide you through the process.",
              },
              {
                q: "Do you offer financing options?",
                a: "Yes! We offer easy EMI options starting from ₹2,999/month with instant approval. We partner with leading banks and NBFCs for competitive rates.",
              },
              {
                q: "What's the warranty on your vehicles?",
                a: "All our vehicles come with 2-3 years warranty on the vehicle and battery. We also offer extended warranty options for additional peace of mind.",
              },
            ].map((faq) => (
              <Card key={faq.q}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
