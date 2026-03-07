"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Upload, FileText, CheckCircle2 } from "lucide-react";

const services = [
  { value: "accompagnement-redaction-memoire-these", label: "Accompagnement à la rédaction de mémoire/thèse" },
  { value: "collecte-donnees-extraction-web", label: "Collecte de données & extraction web" },
  { value: "etude-marche", label: "Étude de marché" },
  { value: "visualisation-donnees", label: "Visualisation de données" },
  { value: "formations-accompagnement", label: "Formations pratiques et accompagnement personnalisé" },
  { value: "autre", label: "Autre (préciser dans la description)" },
];

export default function QuotePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    attachment: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "Demande de devis envoyée !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
      } else {
        throw new Error("Failed to send quote request");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Demande de devis
              </h1>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Votre demande a été envoyée avec succès !
                </h2>
                <p className="text-muted-foreground mb-8">
                  Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet et vous proposer un devis personnalisé.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => window.location.href = "/"}>
                    Retour à l'accueil
                  </Button>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Nouvelle demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Demander un devis
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous et recevez une réponse personnalisée dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Informations du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <Label htmlFor="serviceType">Type de service *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description du besoin *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Plus votre description est détaillée, plus nous pourrons vous proposer une offre adaptée.
                  </p>
                </div>




               {/* Attachment (Optional) */}
                  <div>
                    <Label htmlFor="attachment">Pièce jointe (facultatif)</Label>

                    <div className="mt-2 flex justify-center">
                      <Label
                        htmlFor="attachment"
                        className="cursor-pointer"
                      >
                        <div className="w-full max-w-xl border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">


                          {/* Icône */}
                          {selectedFile ? (
                            <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 mb-4" />
                          ) : (
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          )}

                          {/* Texte principal */}
                          <p className="text-sm text-muted-foreground mb-2">
                            {selectedFile
                              ? "Fichier sélectionné avec succès"
                              : "Glissez-déposez un fichier ici ou cliquez pour sélectionner"}
                          </p>

                          {/* Nom du fichier */}
                          {selectedFile ? (
                            <p className="text-sm font-medium text-primary break-all">
                              {selectedFile.name}
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                            </p>
                          )}
                        </div>
                      </Label>
                    </div>

                    <Input
                      id="attachment"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                      }}
                    />

                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      Vous pouvez joindre tout document utile (cahier des charges, données, exemples...)
                    </p>
                  </div>





                {/* Submit */}
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      Envoyer ma demande
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez que nous vous contactions pour discuter de votre projet.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Devis gratuit</h3>
                <p className="text-sm text-muted-foreground">
                  Obtenez une estimation detaillee sans engagement
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Reponse rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Nous repondons generalement sous 24 a 48h
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sur mesure</h3>
                <p className="text-sm text-muted-foreground">
                  Chaque devis est adapte a vos besoins specifiques
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
