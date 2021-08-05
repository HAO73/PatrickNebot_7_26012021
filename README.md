Groupomania
Backend : Ce projet est développé avec NodeJS, Express, Sequelize et Mysql

Frontend : Ce projet est développé en javascript natif.

BACKEND

L'installation de NodeJS, Express, Sequelize et Mysql est requise sur votre ordinateur.

À la racine du dossier backend, faites un npm install

Créez une base de données nommée "database_development_groupomania" dans votre base de données mysql. Command : CREATE DATABASE database_development_groupomania;

Pour modifier le mot de passe mysql faites la commande: mysqladmin -u -root password VOTRE MOT DE PASSE

Creer un fichier dotenv dans le dossier /backend contenant les informations suivantes :

DB_NAME=database_development_groupomania
DB_USER="*utilisateur de la base de données*"
DB_PASS="*mot de passe de l'utilisateur*"
TOKEN_KEY="*clé de chiffrement pour JsonWebToken*"

Pour finaliser la base de données, executez dans la racine du dossier backend : Command : "sequelize db:migrate"

Faites un node server ou nodemon server (node requis pour cette application)
