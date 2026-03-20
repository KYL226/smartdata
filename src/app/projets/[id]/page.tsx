import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Target, Lightbulb, TrendingUp, Quote } from "lucide-react";
import Image from "next/image";

async function getProject(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects/${id}`,
    {
      cache: "no-store",
    }
  );

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
      <section className="py-8 bg-muted/30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link
            href="/projets"
            className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project Image */}
      {project.image && (
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative overflow-hidden aspect-video rounded-2xl bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Project Content */}
      <section className="py-16">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Objective */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Objectif</h2>
                  <p className="text-muted-foreground">{project.objective}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Méthodologie</h2>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {project.methodology}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Résultats</h2>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {project.results}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial */}
          {project.testimonial && (
            <Card className="mb-8 bg-primary/5">
              <CardContent className="pt-8 pb-8">
                <Quote className="w-8 h-8 mb-4 text-primary/20" />
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
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Vous avez un projet similaire ?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Contactez-nous pour discuter de votre projet et découvrir comment nous
            pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button size="lg" asChild>
            <Link href="/devis">
              Demander un devis
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}