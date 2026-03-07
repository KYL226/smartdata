"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Lock, Shield, UserPlus } from "lucide-react";

export default function AdminAuthPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isRegister
        ? "/api/admin/register"
        : "/api/admin/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur");
      }

      if (isRegister) {
        toast({
          title: "Administrateur créé",
          description: "Vous pouvez maintenant vous connecter",
        });
        setIsRegister(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        document.cookie = `admin_session=${data.token}; path=/; max-age=86400`;
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur le tableau de bord administrateur",
        });
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            {isRegister ? (
              <UserPlus className="h-8 w-8 text-primary" />
            ) : (
              <Shield className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isRegister ? "Créer un administrateur" : "Administration"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isRegister
              ? "Initialisation de l’accès administrateur"
              : "Connectez-vous pour accéder au tableau de bord"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Mot de passe administrateur</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez le mot de passe"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading
                ? isRegister
                  ? "Création..."
                  : "Connexion..."
                : isRegister
                ? "Créer le compte"
                : "Se connecter"}
            </Button>
          </form>

          {/* 🔁 Switch Login / Register */}
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Déjà administrateur ? Se connecter"
                : "Première connexion ? Créer un administrateur"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Espace sécurisé réservé aux administrateurs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
