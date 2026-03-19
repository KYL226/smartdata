"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projets", href: "/projets" },
  { name: "À propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <nav className="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-8">

        {/* LOGO */}
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

        {/* BOUTON MOBILE */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-black transition hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button className="text-white bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/devis">Demander un devis</Link>
          </Button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          
          {/* OVERLAY */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="fixed top-0 right-0 z-50 w-full h-full max-w-sm p-6 transition-transform duration-300 bg-white shadow-lg">

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-black">
                Smart<span className="text-blue-600">Data</span>
              </span>

              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* LIENS */}
            <div className="flex flex-col gap-3 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 font-semibold text-black rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* BOUTON */}
            <div className="mt-6">
              <Button className="w-full text-white bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/devis" onClick={() => setMobileMenuOpen(false)}>
                  Demander un devis
                </Link>
              </Button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}