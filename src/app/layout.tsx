import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SmartData - Transformez vos données en décisions éclairées",
  description: "SmartData vous accompagne dans l'analyse statistique de vos données pour optimiser votre stratégie et prendre des décisions basées sur des faits concrets.",
  keywords: ["analyse statistique", "data analysis", "data science", "études de marché", "visualisation de données", "Côte d'Ivoire", "Bouaké"],
  authors: [{ name: "SmartData" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SmartData - Transformez vos données en décisions éclairées",
    description: "Expertise en analyse statistique et data science",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground min-h-screen flex flex-col"
      >
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
