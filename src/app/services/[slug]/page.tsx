import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Database, BarChart3, PieChart, GraduationCap, Quote } from "lucide-react";

type ServiceIcon = ComponentType<{ className?: string }>;

const servicesData: Record<
  string,
  {
    title: string;
    icon: ServiceIcon;
    color: string;
    image: string;
    fullDescription: string;
    features: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  }
> = {
  "accompagnement-redaction-memoire-these": {
    title: "Accompagnement à la rédaction de mémoire/thèse",
    icon: BookOpen,
    color: "text-primary",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    fullDescription: "Notre accompagnement pour la rédaction de mémoires et thèses vous guide à travers chaque étape de votre recherche, de la formulation de la problématique à l'interprétation des résultats. Nous mettons notre expertise en méthodologie statistique au service de votre réussite académique.",
    features: [
      "Aide à la formulation de la problématique et des hypothèses de recherche",
      "Conseil sur le choix de la méthodologie statistique appropriée",
      "Assistance pour la collecte et le traitement des données",
      "Analyse statistique avancée avec des outils professionnels (SPSS, R, Python, Stata, Jamovi, Eviews, etc.)",
      "Interprétation des résultats et mise en forme des tableaux et graphiques",
      "Relecture et corrections pour garantir la rigueur scientifique",  
    ],
    // testimonial: {
    //   quote: "L'accompagnement de SmartData a été déterminant pour ma thèse. Leur expertise en statistiques m'a permis de valider mes hypothèses avec des analyses robustes et crédibles.",
    //   author: "Dr. Marie Kouassi",
    //   role: "Docteure en Économie"
    // }
  },
  "collecte-donnees-extraction-web": {
    title: "Collecte de données & extraction web",
    icon: Database,
    color: "text-primary",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    fullDescription: "Nous collectons et structurons vos données à partir de multiples sources en utilisant des techniques avancées d'extraction web (web scraping). Que vous ayez besoin de données de marché, de réseaux sociaux ou de sites web spécialisés, nous vous fournissons des données propres, structurées et prêtes à l'analyse.",
    features: [
      "Elaboration de questionnaires; sondages et enquêtes",
      "Extraction de données depuis des sites web et plateformes en ligne",
      "Nettoyage et structuration de base de données",
      "Respect des politiques de confidentialité et des réglementations (RGPD)",
      "Livraison de données dans le format de votre choix (Excel, CSV, JSON, base de données, etc.)",
      "Automatisation de la collecte pour des mises à jour régulières"
    ],
    // testimonial: {
    //   quote: "Grâce à SmartData, nous avons pu collecter des données de marché pertinentes que nous n'aurions jamais pu rassembler manuellement. Leur travail nous a fait économiser des mois de recherche.",
    //   author: "Jean-Pierre Yao",
    //   role: "Directeur Marketing, TechStartup CI"
    // }
  },
  "etude-marche": {
    title: "Étude de marché",
    icon: BarChart3,
    color: "text-primary",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    fullDescription: "Nos études de marché vous permettent de comprendre votre environnement concurrentiel, d'identifier les opportunités de croissance et de prendre des décisions stratégiques basées sur des données fiables. Nous utilisons des méthodologies quantitatives et qualitatives pour obtenir des insights actionnables.",
    features: [
      "Analyse de la taille et du potentiel du marché",
      "Étude de la concurrence, du positionnement, de la segmentation et du profil de la clientèle cible  ",
      "Analyse des tendances et évolutions du marché",
      "Sondages et enquêtes auprès des consommateurs",
      "Analyse SWOT et matrice de positionnement",
      "Recommandations stratégiques basées sur les données"
    ],
    // testimonial: {
    //   quote: "L'étude de marché réalisée par SmartData nous a permis d'identifier un segment de clientèle inexploité. Nos ventes ont augmenté de 40% après avoir ajusté notre stratégie.",
    //   author: "Aminata Diallo",
    //   role: "CEO, AgriTech Solutions"
    // }
  },
  "visualisation-donnees": {
    title: "Visualisation de données",
    icon: PieChart,
    color: "text-primary",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    fullDescription: "Transformez vos données complexes en visualisations claires et percutantes. Nous créons des tableaux de bord interactifs, des graphiques et des rapports visuels qui facilitent la compréhension et la prise de décision à tous les niveaux de votre organisation.",
    features: [
      "Création de tableaux de bord interactifs et personnalisables",
      "Conception de graphiques et visualisations adaptés à vos données",
      "Rapports visuels automatisés avec mises à jour en temps réel",
      "Intégration avec vos outils existants (Excel, Power BI, Tableau)",
      "Formation de vos équipes à l'interprétation des visualisations",
      "Création de templates réutilisables pour des rapports réguliers"
    ],
    // testimonial: {
    //   quote: "Les visualisations créées par SmartData ont transformé la façon dont notre conseil d'administration prend ses décisions. Les données sont maintenant accessibles et compréhensibles pour tous.",
    //   author: "Kouamé N'Guessan",
    //   role: "Directeur Financier, Holding Group"
    // }
  },
  "formations-accompagnement": {
    title: "Formations pratiques et accompagnement personnalisé",
    icon: GraduationCap,
    color: "text-primary",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    fullDescription: "Nos formations allient théorie essentielle, pratique intensive et accompagnement personnalisé pour aider professionnels, étudiants et chercheurs à maîtriser l’analyse de données et à valoriser efficacement leurs travaux.",
    features: [
      "Formations en analyse statistique de base à avancé",
      "Initiation aux outils de collecte d'analyse de données (Google forms, Sphinx, kobocollect, Excel, Power BI SPSS, R, Python)",
      "Formation à la visualisation de données et création de rapports",
      "Accompagnement individuel ou collectif sur vos projets en cours",
      "Support continu après la formation pour questions et mise en pratique",
      "Programmes personnalisés selon les besoins de votre équipe"
    ],
    // testimonial: {
    //   quote: "Après la formation de SmartData, notre équipe marketing est devenue autonome dans l'analyse de ses campagnes. Nous prenons maintenant des décisions basées sur des données concrètes.",
    //   author: "Fatou Bamba",
    //   role: "Responsable Marketing, Retail Chain"
    // }
  }
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className={service.image}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
              <service.icon className={`h-6 w-6 ${service.color}`} />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {service.fullDescription}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Ce que nous proposons
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-foreground">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {service.testimonial && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-background">
              <CardContent className="pt-8 pb-8">
                <Quote className="h-12 w-12 text-primary/20 mb-4" />
                <blockquote className="text-xl italic text-muted-foreground mb-6">
                  {service.testimonial!.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {service.testimonial!.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{service.testimonial!.author}</p>
                    <p className="text-sm text-muted-foreground">{service.testimonial!.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Prêt à commencer votre projet ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Demandez un devis gratuit pour découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button size="lg" asChild>
            <Link href="/devis">
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
