import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex lg:flex-1 items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-16 w-auto relative">
                  <Image 
                    src="/upload/logoSD-removebg-preview.png" 
                    alt="SmartData Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Transformez vos données en décisions éclairées. SmartData vous accompagne dans l&apos;analyse statistique pour optimiser votre stratégie.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Abidjan, Côte d&apos;Ivoire</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+225 07 01 46 88 21</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:contact@smartdata.ci" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  smartdataconsulting@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://wa.me/2250000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartData. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
