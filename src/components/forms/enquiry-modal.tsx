"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  productInterest: z.string().optional(),
  variantInterest: z.string().optional(),
  enquiryType: z.enum(["PRICE_QUOTE", "TEST_RIDE", "SHOWROOM_VISIT", "GENERAL"]),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  productName: string;
  variantName?: string;
  variants?: { id: string; name: string; price: number }[];
  trigger: React.ReactNode;
  defaultTab?: "price" | "testride" | "visit";
}

export function EnquiryModal({
  productName,
  variantName,
  variants,
  trigger,
  defaultTab = "price",
}: EnquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productInterest: productName,
      variantInterest: variantName || "",
      enquiryType: defaultTab === "price" ? "PRICE_QUOTE" : defaultTab === "testride" ? "TEST_RIDE" : "SHOWROOM_VISIT",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "WEBSITE_FORM",
          message: `[${data.enquiryType}] ${data.preferredDate ? `Preferred Date: ${data.preferredDate}` : ""} ${data.preferredTime ? `Time: ${data.preferredTime}` : ""}\n${data.message || ""}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const messages = {
          PRICE_QUOTE: "Thank you! Our team will share the price details shortly.",
          TEST_RIDE: "Test ride booked! We'll confirm the schedule soon.",
          SHOWROOM_VISIT: "Visit scheduled! We look forward to seeing you.",
          GENERAL: "Thank you for your interest! We'll contact you soon.",
        };
        toast.success(messages[data.enquiryType]);
        reset();
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to submit. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as typeof activeTab);
    const typeMap = {
      price: "PRICE_QUOTE",
      testride: "TEST_RIDE",
      visit: "SHOWROOM_VISIT",
    } as const;
    setValue("enquiryType", typeMap[tab as keyof typeof typeMap]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enquire About {productName}</DialogTitle>
          <DialogDescription>
            Fill in your details and we&apos;ll get back to you promptly.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="price" className="text-xs sm:text-sm">
              <Phone className="h-4 w-4 mr-1 hidden sm:inline" />
              Get Price
            </TabsTrigger>
            <TabsTrigger value="testride" className="text-xs sm:text-sm">
              <Calendar className="h-4 w-4 mr-1 hidden sm:inline" />
              Test Ride
            </TabsTrigger>
            <TabsTrigger value="visit" className="text-xs sm:text-sm">
              <MapPin className="h-4 w-4 mr-1 hidden sm:inline" />
              Visit Us
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                {...register("email")}
              />
            </div>

            {/* Variant Selection */}
            {variants && variants.length > 1 && (
              <div className="space-y-2">
                <Label>Select Variant</Label>
                <Select
                  defaultValue={variantName}
                  onValueChange={(value) => setValue("variantInterest", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={v.name}>
                        {v.name} - ₹{v.price.toLocaleString("en-IN")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Tab-specific fields */}
            <TabsContent value="price" className="mt-0 space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Get the best price quote for <strong>{productName}</strong> with exclusive offers and financing options.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="testride" className="mt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("preferredDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select onValueChange={(value) => setValue("preferredTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</SelectItem>
                      <SelectItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</SelectItem>
                      <SelectItem value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</SelectItem>
                      <SelectItem value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visit" className="mt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitDate">Visit Date</Label>
                  <Input
                    id="visitDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("preferredDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visitTime">Visit Time</Label>
                  <Select onValueChange={(value) => setValue("preferredTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</SelectItem>
                      <SelectItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</SelectItem>
                      <SelectItem value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</SelectItem>
                      <SelectItem value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Auhiro Motors Showroom</p>
                    <p className="text-sm text-muted-foreground">
                      123 EV Street, Green Park<br />
                      New Delhi - 110016
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Any specific requirements or questions..."
                rows={3}
                {...register("message")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
