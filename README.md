# SmartData Consulting – Site Web Next.js

Application web **vitrine et d’administration** pour **SmartData Consulting**, développée avec **Next.js**, **React**, **Tailwind CSS**, **Prisma (MySQL)** et **Cloudinary**.

Le site permet de présenter les **services**, **projets**, **actualités**, ainsi que des **formulaires de contact et de demande de devis**.  
Il inclut un **espace administrateur** complet pour gérer les projets, les messages de contact, les demandes de devis et les actualités (flash news).

---

## Stack technique

- **Framework** : Next.js 16 (App Router, TypeScript)
- **UI** : React 19 + Tailwind CSS 4 + composants shadcn / Radix UI
- **Base de données** : Prisma + MySQL
- **Stockage images** : Cloudinary (dossier `smartdata`)
- **Emails** : Nodemailer (SMTP)
- **Icônes** : lucide-react

---

## Lancer le projet en local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```bash
# Base de données MySQL (obligatoire)
DATABASE_URL="mysql://USER:MOT_DE_PASSE@HOST:3306/NOM_DE_LA_BASE"

# Exemple local :
# DATABASE_URL="mysql://root:@localhost:3306/smartdatadb"

# Administration
ADMIN_PASSWORD="admin123"

# URL publique (pour liens absolus)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Cloudinary (upload d'images)
CLOUDINARY_CLOUD_NAME="votre_cloud_name"
CLOUDINARY_API_KEY="votre_api_key"
CLOUDINARY_API_SECRET="votre_api_secret"

# SMTP (emails - Contact & Devis)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="votre_email"
SMTP_PASS="votre_mot_de_passe_app"
SMTP_FROM="SmartData Consulting <votre_email>"
SMTP_TO="smartdataconsulting@gmail.com"
```

Créez une base MySQL vide, puis indiquez-la dans `DATABASE_URL`.

### 3. Migrer la base de données

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Démarrer le serveur

```bash
npm run dev
```

Le site sera accessible à : **http://localhost:3000**

---

## Pages principales

| Route | Description |
|-------|-------------|
| `/` | Accueil : hero, chiffres clés, barre d'actualités (flash news), équipe |
| `/services` | Liste des services avec cartes animées |
| `/services/[slug]` | Détail d'un service |
| `/projets` | Liste des projets (recherche, filtre par témoignage) |
| `/projets/[id]` | Détail d'un projet |
| `/a-propos` | Vision, mission, valeurs |
| `/contact` | Formulaire de contact |
| `/devis` | Formulaire de demande de devis |
| `/admin` | Authentification administrateur |
| `/admin/dashboard` | Tableau de bord admin |

---

## Espace administrateur

### Authentification (`/admin`)

- **Création de l'admin** : première visite → bouton « Créer un administrateur »
- **Connexion** : cookie `admin_session` (valide 24h)

### Tableau de bord (`/admin/dashboard`)

| Onglet | Fonctionnalités |
|--------|-----------------|
| **Projets** | Créer, modifier, supprimer des projets |
| **Messages** | Consulter les messages du formulaire de contact |
| **Devis** | Consulter les demandes de devis, mettre à jour le statut (En attente, En cours, Terminé, Annulé) |
| **Actualités** | CRUD des flash news affichées sur la page d'accueil |

### Upload d'images (Cloudinary)

- Images stockées sur **Cloudinary**, dossier `smartdata`
- Via le formulaire projet : URL directe ou upload de fichier → API `/api/upload-image`
- Les URLs renvoyées sont des URLs Cloudinary (`https://res.cloudinary.com/...`)

---

## API principales

### Public

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/projects` | Liste des projets |
| GET | `/api/projects/[id]` | Détail d'un projet |
| POST | `/api/contact` | Envoi d'un message de contact |
| POST | `/api/quote` | Demande de devis |
| GET | `/api/news` | Actualités publiées (flash news) |
| POST | `/api/upload-image` | Upload d'image → Cloudinary |

### Admin (cookie requis côté front)

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/projects` | Créer un projet |
| PUT | `/api/projects/[id]` | Modifier un projet |
| DELETE | `/api/projects/[id]` | Supprimer un projet |
| GET | `/api/admin/contacts` | Liste des messages de contact |
| GET | `/api/admin/quotes` | Liste des demandes de devis |
| PATCH | `/api/admin/quotes/[id]` | Mettre à jour le statut d'un devis |
| GET | `/api/admin/news` | Toutes les actualités (publiées et masquées) |
| POST | `/api/news` | Créer une actualité |
| PUT | `/api/news/[id]` | Modifier une actualité |
| DELETE | `/api/news/[id]` | Supprimer une actualité |

---

## Modèles Prisma

- **Project** : projets (titre, objectif, méthodologie, résultats, témoignage, image, published)
- **ContactMessage** : messages du formulaire contact
- **QuoteRequest** : demandes de devis (statut : pending, in_progress, done, cancelled)
- **NewsItem** : actualités (flash news) avec titre, description, published

---

## Scripts npm

```bash
npm run dev    # Serveur de développement
npm run build  # Build de production
npm run start  # Démarrer en production
npm run lint   # Linter ESLint
```

---

## Problèmes courants

### Module not found (Prisma ou Radix UI)

```bash
npm install
npx prisma generate
npm run dev
```

### Cloudinary non configuré

Vérifiez que `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` sont définis dans `.env`.

### SMTP non configuré

Les emails (contact, devis) ne seront pas envoyés si les variables SMTP sont manquantes. Un avertissement apparaîtra dans les logs.

---

## Fonctionnalités implémentées

- ✅ Page d'accueil avec bandeau d'actualités défilant (personnalisable en admin)
- ✅ CRUD projets (création, modification, suppression)
- ✅ Gestion des messages de contact
- ✅ Gestion des demandes de devis avec statuts
- ✅ CRUD des actualités (flash news)
- ✅ Upload d'images sur Cloudinary
- ✅ Envoi d'emails SMTP (contact, devis)
- ✅ Footer avec réseaux sociaux (Facebook, Instagram, LinkedIn, YouTube, TikTok)
- ✅ Design responsive avec Tailwind CSS
