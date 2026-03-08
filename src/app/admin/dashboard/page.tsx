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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  attachment: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "contacts" | "quotes" | "news">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    description: "",
    published: true,
  });

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
      else if (activeTab === "news") fetchNews();
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
    setIsLoading(true);
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
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/quotes");
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/news");
      if (response.ok) {
        const data = await response.json();
        setNewsItems(data);
      }
    } catch (err) {
      console.error("Error fetching news items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuoteStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: "Statut mis à jour",
          description: "Le statut de la demande de devis a été mis à jour.",
        });
        fetchQuotes();
      } else {
        throw new Error("Failed to update quote status");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur s'est produite",
      });
    }
  };

  const resetNewsForm = () => {
    setNewsFormData({
      title: "",
      description: "",
      published: true,
    });
    setEditingNews(null);
  };

  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingNews;
    const url = isEdit ? `/api/news/${editingNews?.id}` : "/api/news";
    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsFormData),
      });

      if (response.ok) {
        toast({
          title: isEdit ? "Actualité modifiée" : "Actualité créée",
          description: isEdit
            ? "L'actualité a été mise à jour avec succès"
            : "L'actualité a été créée avec succès",
        });
        await fetchNews();
        resetNewsForm();
        setIsNewsDialogOpen(false);
      } else {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Erreur lors de l'enregistrement de l'actualité");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur s'est produite",
      });
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsFormData({
      title: item.title,
      description: item.description,
      published: item.published,
    });
    setIsNewsDialogOpen(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Actualité supprimée",
          description: "L'actualité a été supprimée avec succès",
        });
        fetchNews();
      } else {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Erreur lors de la suppression de l'actualité");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur s'est produite",
      });
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
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-sm text-muted-foreground">Tableau de bord SmartData</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "projects" ? "default" : "outline"}
            onClick={() => setActiveTab("projects")}
          >
            <Package className="w-4 h-4 mr-2" />
            Projets
          </Button>
          <Button
            variant={activeTab === "contacts" ? "default" : "outline"}
            onClick={() => setActiveTab("contacts")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button
            variant={activeTab === "quotes" ? "default" : "outline"}
            onClick={() => setActiveTab("quotes")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Devis
          </Button>
          <Button
            variant={activeTab === "news" ? "default" : "outline"}
            onClick={() => setActiveTab("news")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Actualités
          </Button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion des projets</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
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
              <div className="py-12 text-center text-muted-foreground">Chargement...</div>
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
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.objective}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="w-4 h-4" />
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
            {isLoading ? (
              <div className="py-12 text-center text-muted-foreground">Chargement...</div>
            ) : contacts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Aucun message pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="p-6 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(contact.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="space-y-1 text-xs text-right text-muted-foreground">
                          <p>{contact.email}</p>
                          {contact.phone && <p>{contact.phone}</p>}
                        </div>
                      </div>
                      <p className="mt-3 text-sm whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Demandes de devis ({quotes.length})</h2>
            {isLoading ? (
              <div className="py-12 text-center text-muted-foreground">Chargement...</div>
            ) : quotes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Aucune demande de devis pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quotes.map((quote) => (
                  <Card key={quote.id}>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">
                            {quote.firstName} {quote.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(quote.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              quote.status === "done"
                                ? "default"
                                : quote.status === "in_progress"
                                ? "secondary"
                                : quote.status === "cancelled"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {quote.status === "pending" && "En attente"}
                            {quote.status === "in_progress" && "En cours"}
                            {quote.status === "done" && "Terminé"}
                            {quote.status === "cancelled" && "Annulé"}
                          </Badge>
                          <Select
                            value={quote.status}
                            onValueChange={(value) =>
                              handleUpdateQuoteStatus(quote.id, value)
                            }
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="in_progress">En cours</SelectItem>
                              <SelectItem value="done">Terminé</SelectItem>
                              <SelectItem value="cancelled">Annulé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                        <p>{quote.email}</p>
                        <p>{quote.phone}</p>
                        <p>{quote.serviceType}</p>
                        {quote.attachment && (
                          <p className="italic">
                            Pièce jointe fournie (voir base de données)
                          </p>
                        )}
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap">
                        {quote.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Actualités (flash news)</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => fetchNews()}
                >
                  Actualiser
                </Button>
                <Button
                  onClick={() => {
                    resetNewsForm();
                    setIsNewsDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle actualité
                </Button>
              </div>
            </div>
            <Dialog
              open={isNewsDialogOpen}
              onOpenChange={(open) => {
                setIsNewsDialogOpen(open);
                if (!open) {
                  resetNewsForm();
                }
              }}
            >
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitNews} className="space-y-4">
                  <div>
                    <Label htmlFor="news-title">Titre *</Label>
                    <Input
                      id="news-title"
                      value={newsFormData.title}
                      onChange={(e) =>
                        setNewsFormData({ ...newsFormData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-description">Description *</Label>
                    <Textarea
                      id="news-description"
                      rows={4}
                      value={newsFormData.description}
                      onChange={(e) =>
                        setNewsFormData({
                          ...newsFormData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="news-published"
                      checked={newsFormData.published}
                      onCheckedChange={(checked: boolean) =>
                        setNewsFormData({ ...newsFormData, published: checked })
                      }
                    />
                    <Label htmlFor="news-published">Publié</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingNews ? "Mettre à jour" : "Créer"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsNewsDialogOpen(false);
                        resetNewsForm();
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            {isLoading ? (
              <div className="py-12 text-center text-muted-foreground">Chargement...</div>
            ) : newsItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Aucune actualité configurée pour le moment. La barre d&apos;actualités utilisera les messages par défaut.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {newsItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={item.published ? "default" : "outline"}>
                            {item.published ? "Publié" : "Masqué"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNews(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteNews(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
