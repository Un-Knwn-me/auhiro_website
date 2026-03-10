"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage site settings and configuration</p>
      </div>

      {/* Site Information */}
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Basic site settings and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="Auhiro Motors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" defaultValue="Ride the Future" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Site Description</Label>
            <Textarea
              id="description"
              rows={3}
              defaultValue="Premium Electric Vehicles - E-Cycles, E-Scooters & E-Mopeds. Experience the future of sustainable mobility."
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="info@auhiromotors.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              rows={2}
              defaultValue="123 EV Street, Tech Park, Bangalore - 560001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input id="whatsapp" type="tel" defaultValue="+919876543210" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Update your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" defaultValue="https://facebook.com/auhiromotors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" defaultValue="https://instagram.com/auhiromotors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input id="twitter" defaultValue="https://twitter.com/auhiromotors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input id="youtube" defaultValue="https://youtube.com/@auhiromotors" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Tracking</CardTitle>
          <CardDescription>Configure analytics and tracking codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gaId">Google Analytics ID</Label>
              <Input id="gaId" placeholder="G-XXXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clarityId">Microsoft Clarity ID</Label>
              <Input id="clarityId" placeholder="Your Clarity Project ID" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Default SEO configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultTitle">Default Meta Title</Label>
            <Input id="defaultTitle" defaultValue="Auhiro Motors - Premium Electric Vehicles" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultDescription">Default Meta Description</Label>
            <Textarea
              id="defaultDescription"
              rows={3}
              defaultValue="Discover premium electric vehicles at Auhiro Motors. E-Cycles, E-Scooters, and E-Mopeds for sustainable mobility."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Default Keywords</Label>
            <Input
              id="keywords"
              defaultValue="electric vehicles, e-cycle, e-scooter, e-moped, EV, electric bike"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
