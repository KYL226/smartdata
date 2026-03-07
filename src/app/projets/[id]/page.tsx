import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Target, Lightbulb, TrendingUp, Quote } from "lucide-react";
import Image from "next/image";

async function getProject(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projets"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project Image */}
      {project.image && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Project Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Objective */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Objectif</h2>
                  <p className="text-muted-foreground">{project.objective}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Méthodologie</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{project.methodology}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Résultats</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{project.results}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial */}
          {project.testimonial && (
            <Card className="mb-8 bg-primary/5">
              <CardContent className="pt-8 pb-8">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <blockquote className="text-lg italic text-muted-foreground">
                  &quot;{project.testimonial}&quot;
                </blockquote>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Vous avez un projet similaire ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button size="lg" asChild>
            <Link href="/devis">
              Demander un devis
              <ArrowLeft className="rotate-180 ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
