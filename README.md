# SmartData Consulting – Site Web Next.js

Application web **vitrine et d’administration** pour **SmartData Consulting**, développée avec **Next.js**, **React**, **Tailwind CSS** et **Prisma (MySQL)**.

Le site permet de présenter les **services**, **projets**, **actualités**, ainsi que des **formulaires de contact et de demande de devis**.  
Il inclut également un **espace administrateur** pour gérer les projets.

---

# Stack technique

- Framework : Next.js (App Router, TypeScript)
- UI : React + Tailwind CSS + composants UI (shadcn / Radix UI)
- Icons : lucide-react
- Base de données : Prisma + **MySQL** (`prisma/schema.prisma`)

---

# Lancer le projet en local

## 1. Installer les dépendances

```bash
npm install
```

## 2. Configurer les variables d’environnement

Créer un fichier `.env` à la racine du projet :

```bash
# MySQL (obligatoire)
DATABASE_URL="mysql://USER:MOT_DE_PASSE@HOST:3306/NOM_DE_LA_BASE"

# Exemple local :
# DATABASE_URL="mysql://root:password@localhost:3306/smartdata"

ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Créez d’abord une base MySQL vide (par exemple `smartdata`), puis indiquez-la dans `DATABASE_URL`.

## 3. Générer et migrer la base de données Prisma (MySQL)

Assurez-vous que MySQL est démarré et que `DATABASE_URL` dans `.env` pointe vers votre base.

```bash
npx prisma migrate dev
npx prisma generate
```

Si vous partez de zéro, la première migration créera les tables. Si vous aviez déjà des migrations SQLite, vous devrez peut‑être créer une nouvelle migration après le passage à MySQL (`prisma migrate dev` proposera de la créer).

## 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le site sera accessible à l’adresse :

```
http://localhost:3000
```

---

# Problèmes courants

## Module not found (Prisma ou Radix UI)

Si vous voyez :

```
Module not found: Can't resolve '@prisma/client'
```
ou
```
Module not found: Can't resolve '@radix-ui/react-dialog'
```

Exécutez :

```bash
npm install
npx prisma generate
```

Puis relancez :

```bash
npm run dev
```

---

# Pages principales

## /

Page **Accueil** avec :

- section héro
- chiffres clés
- présentation de l’entreprise
- barre d’actualités Flash News
- pop-up d’actualité

## /services

Liste des services avec :

- cartes animées
- images
- effet zoom au survol
- lien vers les pages de détail

## /services/[slug]

Page détaillée d’un service :

- description complète
- fonctionnalités
- bouton Demande de devis

## /projets

Liste des projets avec :

- barre de recherche
- filtre d’articles
  - tous
  - avec témoignage
  - sans témoignage

## /projets/[id]

Détail d’un projet :

- objectif
- méthodologie
- résultats
- témoignage client (optionnel)

## /a-propos

Présentation de :

- la vision
- la mission
- les valeurs

## /contact

Formulaire de contact :

- stockage du message en base
- notifications utilisateur

## /devis

Formulaire de demande de devis :

- stockage en base
- interface améliorée
- écran de confirmation

---

# Espace administrateur

## /admin

Page d’authentification administrateur.

Fonctionnement :

- Création de l’admin : `/api/admin/register`
- Connexion : `/api/admin/login`
- Cookie de session : `admin_session`

## /admin/dashboard

Tableau de bord permettant de gérer :

### Projets

- création
- modification
- suppression

Routes utilisées :

```
/api/projects
/api/projects/[id]
```

### Téléversement d’images

Deux options :

- URL d’image
- upload de fichier local

Le fichier est envoyé vers :

```
/api/upload-image
```

Il est stocké dans :

```
public/upload
```

Puis l’URL publique générée est :

```
/upload/nom-image.ext
```

### Messages et devis

Sections prévues pour afficher :

- messages de contact
- demandes de devis

---

# API principales

### Contact

```
POST /api/contact
```

Enregistre un message dans `ContactMessage`.

### Devis

```
POST /api/quote
```

Enregistre une demande dans `QuoteRequest`.

### Projets

```
GET /api/projects
POST /api/projects
GET /api/projects/[id]
PUT /api/projects/[id]
DELETE /api/projects/[id]
```

### Upload d’image

```
POST /api/upload-image
```

- reçoit une image encodée en base64
- la sauvegarde dans `public/upload`
- renvoie l’URL publique

---

# Configuration SMTP (emails)

Pour envoyer des emails depuis les formulaires **Contact** et **Devis**, ajoutez ces variables dans `.env` :

```bash
SMTP_HOST="smtp.votre-fournisseur.com"
SMTP_PORT=587
SMTP_USER="votre_identifiant_smtp"
SMTP_PASS="votre_mot_de_passe_smtp"
SMTP_FROM="SmartData <no-reply@smartdata.ci>"
SMTP_TO="smartdataconsulting@gmail.com"
```

Installer la dépendance :

```bash
npm install nodemailer
```

---

# Fonctionnalités implémentées

## Page d’accueil

- Boutons **Nos services** et **Voir notre approche** mis en avant
- correction du problème de superposition
- ajout d’un bandeau Flash News
- pop-up d’actualité

## Footer

Ajout des réseaux sociaux :

- Facebook
- Instagram
- LinkedIn

## Page Services

- image pour chaque service
- animation et zoom au survol
- bouton retour à l’accueil

## Page Projets

- barre de recherche
- filtre par témoignage

## Arrière-plan commun

Le fond visuel de la page Devis est réutilisé sur :

- Services
- Projets
- À propos
- Contact

L’accueil conserve un design spécifique.

## Administration

- upload d’image local
- modification de projets
- suppression de projets