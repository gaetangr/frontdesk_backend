.. Front Desk documentation master file, created by
   sphinx-quickstart on Tue Dec 15 14:01:16 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. image:: https://camo.githubusercontent.com/b4aa232af22239511135a1a35f8bb0161a36bcda6c01b8528ba77ac31f7557d4/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f686366707972356f6e2f696d6167652f75706c6f61642f76313535313731303335372f6366347474646e70307635663173346d6b6365622e706e67


.. warning:: La documentation est en cours d'écriture, si vous constatez une faute ou des problèmes de cohérence veuillez nous contacter à cette adresse : contact@gmail.com


Se lancer dans le projet
======================================

Les instructions suivantes vous permettront de vous lancer dans le projet et de le faire tourner sur votre machine avec les bons outils, merci d'en prendre connaissance avant toute pull request.
Prérequis
-----------------

- Vérifier la version de Python et Django

``python 3.8.0 ou supérieur``

``Django==3.1.2 > supérieur``

- Vérifier que vous utilisez bien la moteur de BDD Postgresql

Installation
-----------------

Voici étape par étape comment installer front-desk sur votre machine

- Cloner mon repo (ou la branche correspondante)

``git clone https://github.com/gaetangr/frontdesk``

- Créer un environnement virtuel

``python -m venv venv``

- Installer les dépendances 

``pip install -r requirements.txt``


- Créer les fichiers de migrations

``python manage.py migrate``

- Créer un superuser 

``python manage.py createsuperuser``

- Lancer le serveur
``python manage.py runserver``


Informations et commandes utiles
======================================
Voici des commandes et informations utiles pour le dévelopement du projet

Créer un superutilisateur
----------------------------------

- Lancer le serveur
``python manage.py createsuperuser``

Créer un environnement virtuel (Windows)
-----------------------------------------

``python -m venv venv```

``source venv/Scripts/activate``

``python -m pip install --upgrade pip``

``pip install -r requirements.txt``


Créer un environnement virtuel (Mac)
-----------------------------------------

``python3 -m venv venv```

``source venv/bin/activate``

``python -m pip install --upgrade pip``

``pip install -r requirements.txt``



Coding style
======================================

Le projet se conforme aux conventions de la PEP8, certains outils peuvent vous aider.
Si votre code ne respecte pas les conventions établies dans la documentation votre PR sera rejetée.

Analyser votre code avec Flake8
----------------------------------

Avant de publier votre code merci de vérifier ce dernier avec la commande suivante:

``flake8 frontdesk``

Formater votre code avec Black
----------------------------------

Vous pouvez utiliser l'outil de formatage que vous préférez, par défaut, l'outil **black** est installé, vous pouvez l'utiliser avec la commande suivante:

``black frontdesk``

Trier les imports avec Isort
----------------------------------

Vous pouvez formatter les imports avec l'outil Isort:

``isort frontdesk``


Pull request et contributions
======================================


Front-desk est ouvert à la contribution pour son refactoring, voici quelques règles d'usage pour contribuer au projet:

Pull request
----------------------------------
- Le code et la documentation doit être rédigé en anglais

- Les fonctions, commentaires, classes etc doivent être écrient en anglais

- Le code doit respecter les principes suivants KISS, DRY et de manière plus général la **Separation of concerns**.

- Utiliser le CI mis en place (soit Travis ou Github Action) et tester systématiquement les fonctions et classes

- Soyez exhaustif dans le message des commits et les PR

- Ne jamais push sur la master 

Contribution
----------------------------------
Pour contribuer au projet vous pouvez forker le code, si vous souhaitez participer au projet complet merci de me contacter à l'adresse suivante: contact@front-desk.fr.

Roadmap
----------------------------------
La feuille de route du projet est disponible à cette adresse: https://trello.com/b/C4oeeKc3/front-desk-road-map