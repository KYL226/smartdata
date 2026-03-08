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
      <section className="py-16 bg-linear-to-br from-primary/10 via-background to-primary/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              A propos de SmartData consulting
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-black">
              Decouvrez notre histoire, notre mission et les valeurs qui guident
              notre engagement envers nos partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-background">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-primary/10">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                Notre Vision
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
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

            <div className="relative overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-125 rounded-2xl">
              <Image
                src="/upload/imageP1.jpg"
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-125 rounded-2xl">
              <Image
                src="/upload/imageP2.jpg"
                alt="Analyse de données"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-primary/10">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                Notre Mission
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Accompagner nos clients dans la valorisation de leurs données en
                combinant expertise analytique, formation et outils de data
                science, afin de soutenir une prise de décision éclairée et le
                développement des compétences en Afrique
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
                Nous accomplissons cette mission en :
              </p>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                  <span>
                    Offrant des services d&apos;analyse statistique de haute qualite
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                  <span>
                    La formation et le renforcement des capacités des équipes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                  <span>
                    La facilitation de l’accès aux outils, méthodes et
                    technologies de la data science
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nos Valeurs
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Les principes fondamentaux qui guident nos actions et nos
              décisions au quotidien.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <Card
                key={index}
                className="transition-all border hover:shadow-lg"
              >
                <CardContent className="pt-6">
                  <div
                    className={`h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}
                  >
                    <value.icon className={`h-7 w-7 ${value.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Rejoignez notre equipe
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
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
