Groupomania
Backend : Ce projet est développé avec NodeJS, Express, Sequelize et Mysql

Frontend : Ce projet est développé en javascript natif.
cd
BACKEND

L'installation de NodeJS, Express, Sequelize et Mysql est requise sur votre ordinateur.

Installation de la base de données Entrez: - npm i sequelize - sequelize init

Dans le dossier backend modifer le mot de passe dans config/config.json

Créez une base de données nommée "database_development_groupomania" dans votre base de données mysql. Command : CREATE DATABASE database_development_groupomania;

Pour finaliser la base de données, executez dans la racine du dossier backend : Command : "sequelize db:migrate"

Installer le logiciel MAMP Dans preférences/ports cliquez sur le ports 80 & 3306 Ensuite cliquez sur START

Installer mysql dans le backend => npm i mysql (par default le User=root et il n'y a pas de mot de passe) Pour modifier le mot de passe faites la commande: mysqladmin -u -root password VOTRE MOT DE PASSE

À la racine du dossier backend, faites un npm install

Faites un node server ou nodemon server (node recquis pour cette aplication)