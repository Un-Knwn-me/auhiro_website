export const siteConfig = {
  name: "Auhiro Motors",
  description:
    "Premium Electric Vehicles - E-Cycles, E-Scooters & E-Mopeds by Motosoft. Experience the future of sustainable mobility in Coimbatore.",
  tagline: "Ride the Future with Electric Two-wheelers",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://auhiromotors.com",
  ogImage: "/images/og-image.jpg",
  links: {
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917892854258"}?text=Hi, I'm interested in Motosoft electric vehicles at Auhiro Motors.`,
  },
  contact: {
    email: "auhiromotors@gmail.com",
    phone: "+91 78928 54258",
    address:
      "B11, 18th Mettur Rd, Siddhapudur, Near Siddhapudur, Coimbatore, Tamil Nadu 641044",
  },
  social: {
    facebook: "https://facebook.com/auhiromotors",
    instagram: "https://instagram.com/auhiromotors",
    twitter: "https://twitter.com/auhiromotors",
    youtube: "https://youtube.com/@auhiromotors",
  },
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
