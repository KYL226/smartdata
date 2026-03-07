import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

async function getProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type = "all" } = await searchParams;
  const projects = await getProjects();

  const normalizedQuery = q.toLowerCase();

  const filteredProjects = projects.filter((project: any) => {
    const matchesSearch =
      !normalizedQuery ||
      project.title?.toLowerCase().includes(normalizedQuery) ||
      project.objective?.toLowerCase().includes(normalizedQuery);

    const hasTestimonial = Boolean(project.testimonial);

    if (type === "with-testimonial" && !hasTestimonial) return false;
    if (type === "without-testimonial" && hasTestimonial) return false;

    return matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Nos Réalisations
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos projets d'analyse statistique et les résultats concrets que nous avons obtenus pour nos clients.
            </p>
          </div>

          {/* Search & Filter */}
          <form
            className="mt-10 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-center"
            method="GET"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Rechercher un projet
              </label>
              <Input
                type="text"
                name="q"
                placeholder="Rechercher par titre ou objectif..."
                defaultValue={q}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Filtre d'article
              </label>
              <select
                name="type"
                defaultValue={type}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tous les projets</option>
                <option value="with-testimonial">Avec témoignage</option>
                <option value="without-testimonial">Sans témoignage</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition-colors"
              >
                Appliquer les filtres
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Aucun projet ne correspond à votre recherche pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: any) => (
                <Card key={project.id} className="overflow-hidden">
                  {project.image && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.objective}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/projets/${project.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Voir le détail →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
