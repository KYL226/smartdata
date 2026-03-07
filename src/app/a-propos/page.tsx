import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart, Award, Users, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "Nous nous engageons a fournir des analyses de la plus haute qualité en utilisant les méthodologies statistiques les plus avancées.",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Intégrité",
      description:
        "Nous respectons les principes éthiques les plus stricts dans la collecte et l'analyse des données.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et co-créer des solutions adaptées.",
      color: "text-primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Nous intégrons les dernières technologies et méthodes statistiques pour offrir des solutions innovantes.",
      color: "text-primary",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-linear-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-black">
              A propos de SmartData consulting
            </h1>
            <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
              Decouvrez notre histoire, notre mission et les valeurs qui guident
              notre engagement envers nos partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Notre Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Être le partenaire de référence en analyse statistique et data
                science en Afrique de l’Ouest, en accompagnant les entreprises,
                les institutions et les chercheurs dans la transformation de
                leurs données en leviers de décision stratégique.
              </p>
              <p className="text-lg text-muted-foreground">
                En tant que cabinet de conseil en analyse statistique et data
                science, nous combinons expertise technique, accompagnement
                stratégique et formation pour rendre la donnée accessible et
                créatrice de valeur en Afrique de l’Ouest.
              </p>
            </div>

            <div className="relative aspect-square lg:aspect-auto lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/upload/imageP1.svg"
                alt="Analyse de données"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/upload/imageP2.svg"
                alt="Analyse de données"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Accompagner nos clients dans la valorisation de leurs données en
                combinant expertise analytique, formation et outils de data
                science, afin de soutenir une prise de décision éclairée et le
                développement des compétences en Afrique
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Nous accomplissons cette mission en :
              </p>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    Offrant des services d&apos;analyse statistique de haute qualite
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    La formation et le renforcement des capacités des équipes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    La facilitation de l’accès aux outils, méthodes et
                    technologies de la data science
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    La contribution active au développement des compétences data
                    en Afrique
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nos Valeurs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes fondamentaux qui guident nos actions et nos
              décisions au quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="transition-all hover:shadow-lg border"
              >
                <CardContent className="pt-6">
                  <div
                    className={`h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}
                  >
                    <value.icon className={`h-7 w-7 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Rejoignez notre equipe
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vous êtes passionnés par la data science et souhaitez contribuer à
            notre mission ? Contactez-nous pour découvrir les opportunités.
          </p>
          <a
            href="mailto:smartdataconsulting@gmail.com"
            className="text-lg font-medium text-secondary hover:text-secondary/80"
          >
            smartdataconsulting@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
