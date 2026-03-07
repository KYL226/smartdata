"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  FileText,
  MessageSquare,
  Package,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  objective: string;
  methodology: string;
  results: string;
  testimonial: string | null;
  image: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

interface QuoteRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "contacts" | "quotes">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    methodology: "",
    results: "",
    testimonial: "",
    image: "",
    published: true,
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "projects") fetchProjects();
      else if (activeTab === "contacts") fetchContacts();
      else if (activeTab === "quotes") fetchQuotes();
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = () => {
    const token = document.cookie.includes("admin_session");
    if (!token) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/admin");
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      // TODO: implémenter l'API /api/contacts
      setContacts([]);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      // TODO: implémenter l'API /api/quotes
      setQuotes([]);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/projects/${editingProject?.id}` : "/api/projects";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: isEditing ? "Projet modifié" : "Projet créé",
          description: isEditing ? "Le projet a été modifié avec succès" : "Le projet a été créé avec succès",
        });
        fetchProjects();
        resetForm();
        setIsEditing(false);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur s'est produite",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      objective: project.objective,
      methodology: project.methodology,
      results: project.results,
      testimonial: project.testimonial || "",
      image: project.image,
      published: project.published,
    });
    setIsEditing(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Projet supprimé",
          description: "Le projet a été supprimé avec succès",
        });
        fetchProjects();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur s'est produite",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      objective: "",
      methodology: "",
      results: "",
      testimonial: "",
      image: "",
      published: true,
    });
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleLocalImageUpload = async (file: File | null) => {
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const reader = new FileReader();

      const fileData: string = await new Promise((resolve, reject) => {
        reader.onerror = () => reject(new Error("Erreur de lecture du fichier"));
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === "string") {
            // result is base64 with prefix "data:...;base64,"
            const base64 = result.split(",")[1] ?? "";
            resolve(base64);
          } else {
            reject(new Error("Format de fichier invalide"));
          }
        };
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du téléversement");
      }

      setFormData((prev) => ({ ...prev, image: data.url }));
      toast({
        title: "Image importée",
        description: "L'image a été enregistrée localement et liée au projet.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Impossible de téléverser l'image",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-sm text-muted-foreground">Tableau de bord SmartData</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "projects" ? "default" : "outline"}
            onClick={() => setActiveTab("projects")}
          >
            <Package className="mr-2 h-4 w-4" />
            Projets
          </Button>
          <Button
            variant={activeTab === "contacts" ? "default" : "outline"}
            onClick={() => setActiveTab("contacts")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant={activeTab === "quotes" ? "default" : "outline"}
            onClick={() => setActiveTab("quotes")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Devis
          </Button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des projets</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau projet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image du projet *</Label>
                      <div className="space-y-2">
                        <Input
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          required
                          placeholder="URL de l'image ou chemin /upload/mon-image.jpg"
                        />
                        <div className="flex items-center gap-3">
                          <Input
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLocalImageUpload(e.target.files?.[0] ?? null)}
                          />
                          {isUploadingImage && (
                            <span className="text-xs text-muted-foreground">
                              Téléversement en cours...
                            </span>
                          )}
                        </div>
                        {formData.image && (
                          <p className="text-xs text-muted-foreground">
                            Image actuelle : <span className="underline break-all">{formData.image}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="objective">Objectif *</Label>
                      <Textarea
                        id="objective"
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        required
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="methodology">Méthodologie *</Label>
                      <Textarea
                        id="methodology"
                        value={formData.methodology}
                        onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                        required
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="results">Résultats *</Label>
                      <Textarea
                        id="results"
                        value={formData.results}
                        onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                        required
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="testimonial">Témoignage (facultatif)</Label>
                      <Textarea
                        id="testimonial"
                        value={formData.testimonial}
                        onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked: boolean) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published">Publié</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {isEditing ? "Modifier" : "Créer"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Annuler
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Chargement...</div>
            ) : projects.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Aucun projet pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.published ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.objective}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Messages de contact ({contacts.length})</h2>
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Cette fonctionnalité sera bientôt disponible
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Demandes de devis ({quotes.length})</h2>
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Cette fonctionnalité sera bientôt disponible
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
