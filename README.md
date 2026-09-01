# Portfolio de Pascal Ratsiferaniaina

Portfolio Angular autonome : aucune base de données et aucun serveur Python ne sont nécessaires. Les textes, projets et coordonnées sont définis dans `frontend/src/app/core/portfolio.data.ts` ; les images et le CV sont dans `frontend/src/assets/portfolio/`.

## Démarrer sous Windows

1. Installez Node.js 18 ou une version plus récente.
2. Double-cliquez sur `start.bat`.
3. Ouvrez `http://localhost:4200`.

Ou en ligne de commande :

```bash
cd frontend
npm install
npm start
```

## Personnaliser le portfolio

- Les informations personnelles, compétences, projets et galerie : `frontend/src/app/core/portfolio.data.ts`.
- Les images et le CV téléchargeable : `frontend/src/assets/portfolio/`.
- L’administration (`/admin/login`, identifiant `admin`) permet de modifier les contenus. Les changements sont enregistrés dans le navigateur utilisé, via le stockage local, sans base de données.
- Le formulaire de contact confirme l’envoi côté site ; pour recevoir réellement les messages, il faudra plus tard connecter un service d’e-mail ou un formulaire externe.

L’ancienne partie `backend/` peut rester dans le dossier comme archive, mais elle n’est plus utilisée ni démarrée.
