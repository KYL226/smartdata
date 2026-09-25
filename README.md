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
# Secret de signature du cookie de session admin (HMAC-SHA256) - obligatoire
SESSION_SECRET="une_chaine_aleatoire_de_64_caracteres_minimum"
# Force le flag Secure du cookie (true/false). Auto-détecté via x-forwarded-proto sinon.
# COOKIE_SECURE="true"

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
# base vierge / développement (crée une migration)
npx prisma migrate dev
npx prisma generate

# environnement existant / production (applique les migrations en attente)
npm run migrate:deploy
```

### 4. Démarrer le serveur

```bash
npm run dev
```

Le site sera accessible à : **http://localhost:3000**

### 5. Build de production

```bash
npm run migrate:deploy   # applique les migrations
npm run build
npm run start
```

> Si `next build` (Turbopack) échoue en mémoire sur une machine peu dotée, utilisez
> `npx next build --webpack` — même résultat, bundler plus léger.

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

- **Connexion** : mot de passe `ADMIN_PASSWORD` (aucune inscription — la route
  `/api/admin/register` n'existe plus)
- **Session** : cookie `admin_session`, **HttpOnly + SameSite=Strict**, signé
  HMAC-SHA256 avec `SESSION_SECRET`, valable 24h
- **Rate-limit** : 5 tentatives / 15 minutes par IP (HTTP 429 ensuite)
- **Déconnexion** : `POST /api/admin/logout` (invalide le cookie)
- **Protection** : layout serveur `/admin/dashboard` → redirection si session
  absente ; toutes les routes `/api/admin/*` vérifient le cookie côté serveur

### Tableau de bord (`/admin/dashboard`)

| Onglet | Fonctionnalités |
|--------|-----------------|
| **Projets** | Créer, modifier, supprimer des projets |
| **Messages** | Consulter les messages du formulaire de contact |
| **Devis** | Consulter les demandes de devis, mettre à jour le statut (En attente, En cours, Terminé, Annulé) |
| **Actualités** | CRUD des flash news affichées sur la page d'accueil |

### Upload d'images (Cloudinary)

- Images stockées sur **Cloudinary**, dossier `smartdata`
- **Admin** : `POST /api/upload` (cookie requis) → `{ fileName, fileData, kind }`
  avec `kind = "image" | "document"` ; `fileData` = base64 **sans** préfixe
  `data:...;base64,`
- **Public** : `POST /api/quote/attachment` (pièce jointe de devis, documents
  uniquement, rate-limit 10/h)
- Extensions limitées à une liste blanche, **SVG refusé**, 5 Mo (images) /
  10 Mo (documents), contrôle avant décodage

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
| POST | `/api/quote/attachment` | Pièce jointe d'un devis → Cloudinary |

### Admin (cookie `admin_session` vérifié **côté serveur**)

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/admin/login` | Connexion (rate-limit 5/15 min) |
| POST | `/api/admin/logout` | Déconnexion |
| GET | `/api/admin/projects` | Projets (paginés, tous statuts) |
| GET | `/api/admin/contacts` | Messages de contact (paginés) |
| GET | `/api/admin/quotes` | Demandes de devis (paginées) |
| PATCH | `/api/admin/quotes/[id]` | Mettre à jour le statut d'un devis |
| GET | `/api/admin/news` | Toutes les actualités (publiées et masquées) |
| POST | `/api/admin/projects` | Créer un projet |
| PUT | `/api/admin/projects/[id]` | Modifier un projet |
| DELETE | `/api/admin/projects/[id]` | Supprimer un projet |
| POST | `/api/upload` | Upload image/document → Cloudinary |

Les listes admin renvoient `{ items, total, page, pageSize }` et acceptent
`?page=1&pageSize=20`.

---

## Modèles Prisma

- **Project** : projets (titre, objectif, méthodologie, résultats, témoignage, image, published)
- **ContactMessage** : messages du formulaire contact
- **QuoteRequest** : demandes de devis (statut : pending, in_progress, done, cancelled)
- **NewsItem** : actualités (flash news) avec titre, description, published

---

## Scripts npm

```bash
npm run dev             # Serveur de développement
npm run build           # Build de production (prisma generate + next build)
npm run start           # Démarrer en production
npm run lint            # Linter ESLint
npm run typecheck       # Vérification TypeScript (tsc --noEmit)
npm run migrate:dev     # Créer/appliquer une migration en développement
npm run migrate:deploy  # Appliquer les migrations (production)
```

---

## Sécurité

- **Auth admin** : cookie signé HMAC-SHA256 (`SESSION_SECRET`), HttpOnly,
  SameSite=Strict, Secure selon `x-forwarded-proto` / `COOKIE_SECURE`
- **Validation** : toutes les écritures passent par des schémas **zod**
  (`src/lib/validation.ts`)
- **Rate-limiting** : login (5/15 min), contact & devis (10/h), upload (30/h)
- **Headers HTTP** : CSP, X-Frame-Options DENY, nosniff, HSTS, Referrer-Policy,
  Permissions-Policy (`next.config.ts`)
- **Upload** : liste blanche d'extensions, SVG refusé, taille vérifiée avant
  décodage, réservé à l'admin sauf pièce jointe de devis
- **Base** : colonnes de texte longues en `TEXT` (fini la limite VARCHAR(191))

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
