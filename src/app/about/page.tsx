import { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Heart, Users, Award, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Auhiro Motors - our mission, vision, and commitment to sustainable mobility through premium electric vehicles.",
};

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to reducing carbon footprint through innovative electric mobility solutions.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Premium components and rigorous testing ensure the highest standards in every vehicle.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Dedicated support and service to ensure the best ownership experience.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by our love for innovation and sustainable transportation.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "Auhiro Motors was established with a vision for clean mobility." },
  { year: "2021", title: "First Product", description: "Launched our first e-scooter to overwhelming response." },
  { year: "2022", title: "Expansion", description: "Expanded to 20+ cities across India." },
  { year: "2023", title: "10K Customers", description: "Reached 10,000 happy customers milestone." },
  { year: "2024", title: "New Range", description: "Introduced premium e-cycle and e-moped lineup." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Auhiro Motors</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We&apos;re on a mission to revolutionize urban transportation with premium electric vehicles
              that combine performance, style, and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To accelerate the transition to sustainable mobility by providing affordable,
                  high-quality electric vehicles that make eco-friendly transportation accessible to everyone.
                  We believe that every ride should be clean, efficient, and enjoyable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be India&apos;s most trusted electric vehicle brand, leading the charge towards
                  a cleaner, greener future. We envision a world where electric mobility is the norm,
                  not the exception.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Auhiro Motors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a startup with a dream to a growing force in electric mobility.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-primary font-medium">{milestone.year}</div>
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-primary-foreground/80 mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-primary-foreground/80 mt-1">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="text-primary-foreground/80 mt-1">Service Centers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">5</div>
              <div className="text-primary-foreground/80 mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the EV Revolution?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of mobility with Auhiro Motors. Visit our showroom or contact us today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
