"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface WhatsAppButtonProps {
  message?: string;
  productName?: string;
}

export function WhatsAppButton({ message, productName }: WhatsAppButtonProps) {
  const defaultMessage = productName
    ? `Hi, I'm interested in ${productName}. Please share more details.`
    : "Hi, I'm interested in your electric vehicles. Please share more details.";

  const whatsappUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
