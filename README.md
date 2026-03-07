## SmartData Consulting  Site Web Next.js

Application web vitrine et dadministration pour **SmartData Consulting**, dùveloppùe avec **Next.js 16**, **React 19**, **Tailwind CSS 4** et **Prisma (SQLite)**.  
Le site prùsente les services, projets, formulaires de contact et de demande de devis, ainsi quun espace dadministration pour gùrer les projets.

### Stack technique

- **Framework** : Next.js (App Router, TypeScript)
- **UI** : React + Tailwind CSS + composants UI (shadcn)
- **Icons** : lucide-react
- **Base de donnùes** : Prisma + SQLite (`prisma/schema.prisma`)

### Lancer le projet en local

1. Installer les dùpendances :

```bash
npm install
```

2. Configurer les variables díenvironnement dans un fichier `.env` ‡ la racine :

```bash
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="admin123"             # ou autre mot de passe admin
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

3. Gùnùrer et migrer la base Prisma :

```bash
npx prisma migrate dev
npx prisma generate
```

4. Dùmarrer le serveur de dùveloppement :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:3000`.

> **Important** : si vous voyez une erreur `Module not found: Can't resolve '@prisma/client'`, exÈcutez :
>
> ```bash
> npm install @prisma/client prisma
> npx prisma generate
> ```
>
> puis relancez `npm run dev`.

### Pages principales

- `/` : **Accueil** avec hùro, chiffres clùs, prùsentation, barre dactualitùs (flash news) et pop-up dactualitù.
- `/services` : Liste des services avec cartes animùes (image + zoom) et lien vers les dùtails de chaque service.
- `/services/[slug]` : Dùtail dun service, description complùte + fonctionnalitùs + CTA vers la demande de devis.
- `/projets` : Listing des projets avec **barre de recherche** et **filtre darticles** (avec/sans tùmoignage).
- `/projets/[id]` : Dùtail dun projet (objectif, mùthodologie, rùsultats, tùmoignage ùventuel).
- `/a-propos` : Prùsentation de la vision, mission et valeurs (fond visuel harmonisù avec la page devis).
- `/contact` : Formulaire de contact (envoi stockù en base, notifications via toast).
- `/devis` : Formulaire de demande de devis (stockù en base, UI renforcùe, ùcran de confirmation).

### Espace administrateur

- `/admin` : Authentification administrateur
  - Crùation de ladmin : `/api/admin/register` (stockage dans `.admin.json`, uniquement lors de la premiùre initialisation).
  - Connexion : `/api/admin/login` (compare au mot de passe `ADMIN_PASSWORD` et crùe un cookie `admin_session`).
- `/admin/dashboard` : Tableau de bord
  - **Projets** : crùation, modification, suppression de projets via les routes `/api/projects` et `/api/projects/[id]`.
  - **Tùlùversement local dimages** :
    - Champ URL dimage + champ fichier.
    - Le fichier est envoyù ù `/api/upload-image`, sauvegardù dans `public/upload`, et lURL `/upload/nom-fichier.ext` est automatiquement utilisùe dans le projet.
  - **Messages & devis** : onglets prùvus pour laffichage futur des messages contact et demandes de devis.

### API principales

- `POST /api/contact` : enregistre un message de contact (`ContactMessage`) dans la base.
- `POST /api/quote` : enregistre une demande de devis (`QuoteRequest`) dans la base.
- `GET /api/projects` : liste tous les projets.
- `POST /api/projects` : crùe un projet.
- `GET /api/projects/[id]` : retourne un projet par ID.
- `PUT /api/projects/[id]` : met ù jour un projet.
- `DELETE /api/projects/[id]` : supprime un projet.
- `POST /api/upload-image` : reùoit une image encodùe en base64, la sauve dans `public/upload` et renvoie lURL publique.

### Configuration SMTP (envoi d'e-mails)

Pour que les formulaires **Contact** et **Devis** envoient de vrais e-mails via SMTP (en plus de líenregistrement en base), ajoutez ces variables ‡ votre `.env` :

```bash
SMTP_HOST="smtp.votre-fournisseur.com"
SMTP_PORT=587                # 465 si vous utilisez SSL
SMTP_USER="votre_identifiant_smtp"
SMTP_PASS="votre_mot_de_passe_smtp"
SMTP_FROM="SmartData <no-reply@smartdata.ci>"
SMTP_TO="smartdataconsulting@gmail.com"   # adresse qui reÁoit les notifications
```

Puis installez la dÈpendance cÙtÈ serveur :

```bash
npm install nodemailer
```

### Points fonctionnels issus de `NOTE DES TACHES.pdf`

- **Page daccueil**
  - Boutons **ù Nos services ù** et **ù Voir notre approche ù** mis au premier plan (problùme de superposition corrigù).
  - Ajout dun bandeau **Flash News** au-dessus de la page avec dùfilement et **pop-up** dùtaillùe sur clic.
- **Footer**
  - Ajout des icùnes de rùseaux sociaux (Facebook, Instagram, LinkedIn) dans la partie infùrieure gauche sous le texte de prùsentation.
- **Page Services**
  - Chaque service possùde dùsormais une **image dùdiùe** et un **effet danimation/zoom** au survol.
  - Ajout dun bouton de **retour ù la page daccueil**.
- **Page Projets**
  - Ajout dune **barre de recherche**.
  - Ajout dun **filtre darticle** (tous, avec tùmoignage, sans tùmoignage).
- **Arriùre-plan commun**
  - Le fond visuel de la page **devis** est rùutilisù sur les en-tùtes des autres pages principales (services, projets, ù propos, contact), tout en conservant un style spùcifique pour laccueil.
- **Page administrateur**
  - Possibilitù de **tùlùverser une image en local** pour les projets (enregistrement dans `public/upload` via `/api/upload-image`).
  - Edition et suppression de projets dùjù insùrùs pleinement opùrationnelles.

