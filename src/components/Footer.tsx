import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center lg:flex-1">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-40 h-16">
                  <Image 
                    src="/upload/logoSD-removebg-preview.png" 
                    alt="SmartData Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
            <p className="max-w-md mb-4 text-sm text-muted-foreground">
              Transformez vos données en décisions éclairées. SmartData vous accompagne dans l&apos;analyse statistique pour optimiser votre stratégie.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Abidjan, Côte d&apos;Ivoire</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@smartdata.ci" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  smartdataconsulting@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://wa.me/2250000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} SmartData. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
