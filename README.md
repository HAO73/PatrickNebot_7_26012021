Groupomania
Backend : Ce projet est développé avec NodeJS, Express, Sequelize et MAMP(mysql)
Frontend : Ce projet est développé en javascript natif.

BACKEND

L'installation de NodeJS, Express, Sequelize et MAMP (mysql) est requise sur votre ordinateur.

Pour modifier le mot de passe mysql faites la commande : mysqladmin -u -root password VOTRE MOT DE PASSE dans le repertoire ou se trouve le fichier mysqladmin (sous windows
C:\MAMP\BIN\MYSQL\BIN>)

Connectez vous a mysql avec la commande : .\mysql -u root -p

Créez une base de données nommée "database_development_groupomania" dans la ligne de commande mysql. Command : CREATE DATABASE database_development_groupomania;

À la racine du dossier backend, faites un npm install

Creer un fichier dotenv dans le dossier /backend contenant les informations suivantes :

DB_NAME=database_development_groupomania
DB_USER=votre DB user
DB_PASS=votre db mot de passe
TOKEN_KEY=votre clé de chiffrement pour JsonWebToken

Pour finaliser la base de données, executez dans la racine du dossier backend la commande : "sequelize db:migrate"

Faites un node server ou nodemon server 