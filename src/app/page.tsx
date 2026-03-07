"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, CheckCircle2, Users, Award, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const newsItems = [
  {
    title: "Ouverture de nouvelles sessions d'accompagnement mémoire / thèse",
    description:
      "SmartData Consulting ouvre de nouveaux créneaux pour l’accompagnement méthodologique et statistique des mémoires et thèses. Contactez-nous pour réserver votre planning d'encadrement.",
  },
  {
    title: "Formations pratiques en analyse de données et data visualisation",
    description:
      "Des sessions de formation courtes et intensives sur SPSS, R, Python, Excel et Power BI sont disponibles pour étudiants, chercheurs et entreprises. Programmes personnalisables selon vos besoins.",
  },
  {
    title: "Études de marché et enquêtes terrain clé en main",
    description:
      "Nous accompagnons les entreprises, ONG et institutions dans la conception, la collecte et l’analyse de données d’enquêtes afin de mieux connaître leurs marchés et bénéficiaires.",
  },
];

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeNewsIndex, setActiveNewsIndex] = useState<number | null>(null);

  return (
    <>
      {/* Flash News Bar */}
      <section className="py-2 text-white bg-secondary">
        <div className="flex items-center gap-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
            Actualités
          </p>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {newsItems.map((news, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-xs sm:text-sm hover:text-background/90 underline-offset-2 hover:underline"
                  onClick={() => setActiveNewsIndex(index)}
                >
                  {news.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      {/* <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5"> */}
      {/* <section style={{ backgroundColor: '#023859' }} className="py-16"> */}

      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#023859' }}>
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="#C5DBE3" 
              fillOpacity="0.3" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-wave"
            ></path>
            <path 
              fill="#8AB8C9" 
              fillOpacity="0.2" 
              d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,181.3C672,192,768,192,864,181.3C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-wave-slow"
            ></path>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
                  Prenez l&apos;avantage avec<br />une vision claire de vos Données !
                </h1>
                <div className="mt-8 space-y-4">
                  <p className="text-lg text-primary-foreground/90">
                    SmartData consulting vous accompagne dans l&apos;analyse statistique de vos données pour optimiser votre stratégie et prendre des décisions basées sur des faits concrets.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-10 sm:flex-row">
                  <Button size="lg" className="text-white bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/services">
                      Nos Services
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-black border-white hover:bg-white/10"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <div className="flex items-center justify-center w-6 h-6 mr-2 border-2 border-black rounded-full">
                      <Play className="w-3 h-3 fill-black" />
                    </div>
                    Voir notre approche
                  </Button>
                </div>
              </div>

              <div className="relative aspect-square lg:aspect-auto lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/upload/imageA1.jpg"
                  alt="Analyse de données"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Key Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nos chiffres clés
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Découvrez l&apos;impact de nos analyses à travers quelques chiffres
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">40+</div>
                <p className="text-sm text-muted-foreground">Projets réalisés</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">99%</div>
                <p className="text-sm text-muted-foreground">Clients satisfaits</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">2+</div>
                <p className="text-sm text-muted-foreground">Années d&apos;expérience</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">3</div>
                <p className="text-sm text-muted-foreground">Experts statisticiens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Une équipe d&apos;experts à votre service
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Notre équipe est composée de statisticiens et data scientists expérimentés avec plus de 5 ans d&apos;expérience. Nous mettons notre expertise au service de vos projets pour vous garantir des résultats fiables et pertinents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Expertise academique et pratique</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Methodologies rigoureuses </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Approche personnalisée pour chaque projet</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Accompagnement sur mesure</span>
                </li>
              </ul>
            </div>

            <div className="relative aspect-square lg:aspect-auto lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/upload/ImageA2.jpg"
                alt="Analyse de données"
                fill
                className="object-cover"
              />
            </div>
            

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à exploiter la puissance de vos données ?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Contactez-nous des aujourd&apos;hui pour discuter de votre projet et découvrir comment notre expertise statistique peut vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="text-white bg-secondary hover:bg-secondary/90">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="w-[50vw] max-w-4xl bg-background rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Notre Approche</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsVideoOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative aspect-video bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20">
                    <Play className="w-10 h-10 fill-current text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    Découvrez notre approche
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Vidéo de présentation à venir
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <Button 
                className="text-white bg-secondary hover:bg-secondary/90"
                onClick={() => setIsVideoOpen(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* News Modal */}
      {activeNewsIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setActiveNewsIndex(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden shadow-2xl bg-background rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Actualité</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveNewsIndex(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-3">
              <h4 className="text-lg font-semibold">
                {newsItems[activeNewsIndex].title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {newsItems[activeNewsIndex].description}
              </p>
            </div>
            <div className="flex justify-end p-4">
              <Button
                className="text-white bg-secondary hover:bg-secondary/90"
                onClick={() => setActiveNewsIndex(null)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
