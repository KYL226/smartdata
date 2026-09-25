"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold tracking-tight text-destructive">500</p>
      <h1 className="mt-4 text-2xl font-semibold">
        Une erreur inattendue est survenue
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Notre équipe a été notifiée. Vous pouvez réessayer dans un instant.
      </p>
      <Button className="mt-8" onClick={reset}>
        Réessayer
      </Button>
    </div>
  );
}
