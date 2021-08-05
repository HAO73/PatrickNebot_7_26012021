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
DB_USER=votre DB user
DB_PASS=votre db mot de passe
TOKEN_KEY=votre clé de chiffrement pour JsonWebToken

Pour finaliser la base de données, executez dans la racine du dossier backend la commande : "sequelize db:migrate"

Faites un node server ou nodemon server (node requis pour cette application)
