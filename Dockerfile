# Utiliser une image Node.js officielle pour construire l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le dossier Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]