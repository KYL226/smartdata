import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen, Database, BarChart3, PieChart, GraduationCap } from "lucide-react";

const services = [
  {
    slug: "accompagnement-redaction-memoire-these",
    title: "Accompagnement a la redaction de memoire/these",
    description: "Beneficiez d'un accompagnement personnalise pour la redaction de vos memoires et these avec une methodologie statistique rigoureuse.",
    icon: BookOpen,
    color: "text-primary",
    image: "/upload/imageT.jpg",
  },
  {
    slug: "collecte-donnees-extraction-web",
    title: "Collecte de donnees & extraction web",
    description: "Nous collectons et structurons vos donnees a partir de multiples sources, y compris le web scraping, pour des analyses approfondies.",
    icon: Database,
    color: "text-primary",
    image: "/upload/imageDonnee.jpg",
  },
  {
    slug: "etude-marche",
    title: "Etude de marche",
    description: "Analysez votre marche, identifiez les opportunites et comprenez le comportement de vos clients grace a des methodes statistiques rigoureuses.",
    icon: BarChart3,
    color: "text-primary",
    image: "/upload/imagemarché.jpg",
  },
  {
    slug: "visualisation-donnees",
    title: "Visualisation de donnees",
    description: "Transformez des donnees complexes en visualisations claires et percutantes pour faciliter la comprehension et la prise de decision.",
    icon: PieChart,
    color: "text-primary",
    image: "/upload/imagevisualisation.jpg",
  },
  {
    slug: "formations-accompagnement",
    title: "Formations pratiques et accompagnement personnalise",
    description: "Formez vos equipes aux methodes statistiques et a l'analyse de donnees pour renforcer votre autonomie decisionnelle.",
    icon: GraduationCap,
    color: "text-primary",
    image: "/upload/imageformation.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour a l&apos;accueil
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Nos Services
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Découvrez notre gamme complète de services d&apos;analyse statistique adaptés à vos besoins spécifiques et à votre secteur d&apos;activité.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all border hover:shadow-xl hover:border-primary/40">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 transform group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                      <service.icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="transition-colors group-hover:text-primary">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center font-medium text-secondary">
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Besoin d&apos;un service sur mesure ?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Contactez-nous pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.
          </p>
          <Link href="/devis">
            <ArrowRight className="inline-block w-5 h-5 mb-2 text-secondary" />
            <p className="font-medium text-secondary">Demander un devis</p>
          </Link>
        </div>
      </section>
    </>
  );
}
