import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen, Database, BarChart3, PieChart, GraduationCap } from "lucide-react";

const services = [
  {
    slug: "accompagnement-redaction-memoire-these",
    title: "Accompagnement a la redaction de memoire/these",
    description: "Beneficiez d'un accompagnement personnalise pour la redaction de vos memoires et these avec une methodologie statistique rigoureuse.",
    icon: BookOpen,
    color: "text-primary",
    image: "/upload/imageT.svg",
  },
  {
    slug: "collecte-donnees-extraction-web",
    title: "Collecte de donnees & extraction web",
    description: "Nous collectons et structurons vos donnees a partir de multiples sources, y compris le web scraping, pour des analyses approfondies.",
    icon: Database,
    color: "text-primary",
    image: "/upload/imageDonnee.svg",
  },
  {
    slug: "etude-marche",
    title: "Etude de marche",
    description: "Analysez votre marche, identifiez les opportunites et comprenez le comportement de vos clients grace a des methodes statistiques rigoureuses.",
    icon: BarChart3,
    color: "text-primary",
    image: "/upload/imagemarché.svg",
  },
  {
    slug: "visualisation-donnees",
    title: "Visualisation de donnees",
    description: "Transformez des donnees complexes en visualisations claires et percutantes pour faciliter la comprehension et la prise de decision.",
    icon: PieChart,
    color: "text-primary",
    image: "/upload/imagevisualisation.svg",
  },
  {
    slug: "formations-accompagnement",
    title: "Formations pratiques et accompagnement personnalise",
    description: "Formez vos equipes aux methodes statistiques et a l'analyse de donnees pour renforcer votre autonomie decisionnelle.",
    icon: GraduationCap,
    color: "text-primary",
    image: "/upload/imageformation.svg",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour a l'accueil
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Nos Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète de services d'analyse statistique adaptés à vos besoins spécifiques et à votre secteur d'activité.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden border transition-all hover:shadow-xl hover:border-primary/40">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-secondary font-medium">
                      <span>En savoir plus</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Besoin d'un service sur mesure ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contactez-nous pour discuter de vos besoins specifiques et obtenir un devis personnalise.
          </p>
          <Link href="/devis">
            <ArrowRight className="inline-block h-5 w-5 mb-2 text-secondary" />
            <p className="font-medium text-secondary">Demander un devis</p>
          </Link>
        </div>
      </section>
    </>
  );
}
