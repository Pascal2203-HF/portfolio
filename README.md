# Portfolio Professionnel — Angular + Python (FastAPI) + PostgreSQL/SQLite

Application complète de portfolio développeur : présentation, compétences, services,
formations, expériences, projets (avec démos, GitHub, téléchargements), certifications,
galerie, formulaire de contact, et un espace d'administration sécurisé (JWT) pour tout gérer.

## Démarrage rapide (Windows — sans rien configurer)

1. Assurez-vous d'avoir installé :
   - **Python 3.10+** (https://www.python.org/downloads/) — cochez "Add Python to PATH" à l'installation
   - **Node.js 18+** (https://nodejs.org/)
2. Double-cliquez sur **`start.bat`**.
   - Au premier lancement, l'installation des dépendances peut prendre quelques minutes.
   - Deux fenêtres s'ouvrent : une pour le backend, une pour le frontend.
3. Ouvrez votre navigateur sur **http://localhost:4200**
4. Pour arrêter les serveurs, double-cliquez sur **`stop.bat`** (ou fermez les deux fenêtres).

### Accès administrateur

- URL : http://localhost:4200/admin/login
- Identifiant : `admin`
- Mot de passe : `admin123`

⚠️ Pensez à changer ce mot de passe (variable `ADMIN_PASSWORD` dans `backend/.env`) avant
toute mise en ligne publique.

## Base de données

Par défaut, l'application utilise **SQLite** (fichier `backend/portfolio.db`), donc aucune
installation supplémentaire n'est nécessaire — tout fonctionne directement.

Pour utiliser **PostgreSQL** à la place, modifiez `backend/.env` :
```
DATABASE_URL=postgresql://utilisateur:motdepasse@localhost:5432/nom_de_la_base
```
puis installez le pilote (déjà inclus dans `requirements.txt` : `psycopg2-binary`).

## Structure du projet

```
portfolio-app/
├── start.bat              <- double-clic pour tout démarrer
├── stop.bat                <- double-clic pour tout arrêter
├── backend/                <- API REST FastAPI
│   ├── app/
│   │   ├── main.py         <- point d'entrée, CORS, init des données
│   │   ├── models.py       <- modèles SQLAlchemy (tables)
│   │   ├── schemas.py      <- schémas Pydantic
│   │   ├── auth.py         <- authentification JWT
│   │   ├── database.py     <- connexion DB (SQLite/PostgreSQL)
│   │   └── routers/        <- routes API (profil, projets, compétences, etc.)
│   ├── requirements.txt
│   └── .env                <- configuration (clé secrète, identifiants admin, DB)
└── frontend/                <- application Angular 17
    └── src/app/
        ├── pages/           <- pages publiques (accueil, à propos, projets, contact...)
        ├── admin/           <- connexion + tableau de bord administrateur
        ├── shared/          <- navbar, footer
        └── core/            <- services API, modèles, authentification, thème
```

## Fonctionnalités principales

- **Pages publiques** : Accueil, À propos, Compétences (avec barres de progression),
  Services, Formation, Expériences, Projets (liste + fiche détaillée avec démo/GitHub/
  téléchargement/galerie/vidéo), Certifications, Galerie, Contact (formulaire).
- **Mode clair/sombre** persistant (bouton dans la barre de navigation).
- **Espace admin** protégé par JWT : gestion complète (créer/modifier/supprimer) de toutes
  les sections, upload d'images, suivi des messages de contact, statistiques (visites,
  projets publiés, téléchargements, messages non lus).
- **API REST sécurisée** (FastAPI) avec documentation interactive disponible sur
  http://localhost:8000/docs

## Démarrage manuel (sans le .bat)

**Backend :**
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend :**
```bash
cd frontend
npm install
npm start
```

## Personnalisation

Toutes les informations (nom, titre, biographie, projets, compétences, etc.) sont à
remplir directement depuis l'espace d'administration — aucune modification de code n'est
nécessaire pour personnaliser le contenu du portfolio.
