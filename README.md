# ✨ Front Desk - V2.0 ✨

Front-Desk.fr est une plateforme d'outils pour hôteliers connectés 100% gratuite : Cahier de consignes, registre de maintenance, gestion de plannings et fichiers et bien plus ...

L'outil est utilisé par les hôtels de grands groupes comme Accorhotels (majoritaire), Best Western, IHG, Mariotte International, Hilton Worlwide._
 ## Sommaire 📋

  
- [Ressources internes](#ressources-internes-📚)

- [Refactoring](#refactoring-♻️)

- [Se lancer dans le projet](#se-lancer-dans-le-projet-🚀)

- [Prérequis](#prérequis)

- [Installation](#installation)

- [Pull request & contributions](#pull-request-et-contributions-📥)

- [Outils](#outils-🛠)

- [Contributeurs](#contributeurs-💻)

## Ressources internes 📚
Les liens suivants sont des ressources internes qui vous informe sur le projet (Front Desk V2), son périmètre d'action et la road map.

 [Trello - RoadMap](https://trello.com/b/C4oeeKc3/front-desk-road-map)
 [Cahier des charges](https://github.com/gaetangr/frontdesk_V2/blob/main/docs/internal_docs/Front%20Desk%20-%20Cahier%20Des%20Charges.pdf)
 [Dossier de conception fonctionnelle](https://github.com/gaetangr/frontdesk_V2/blob/main/docs/internal_docs/Front%20Desk%20-%20Dossier%20de%20conception%20fonctionnelle.pdf)
## Refactoring ♻️

  
La première version de Front Desk est sortie en janvier 2020, 1 an après la plateforme se lance dans un refactoring complet pour un lancement prévu début 2021.

L'objectif est de repenser le code initial et répondre aux standards de l'industrie du logiciel moderne (TDE, tests unitaires, DRY & SOC, documentation complètes etc...)
    
## Se lancer dans le projet 🚀

  

Les instructions suivantes vous permettront de vous lancer dans le projet et de le faire tourner sur votre machine avec les bons outils, merci d'en prendre connaissance avant toute pull request.

### Prérequis

  

- Vérifier la version de Python et Django

 
```

python 3.8.0 ou supérieur

```

  

```

Django==3.1.2 > supérieur

```

  

- Vérifier que vous utilisez bien la moteur de BDD Postgresql

  

### Installation

  

Voici étape par étape comment installer front-desk sur votre machine

  

- Cloner mon repo **ne pas faire de push sur la branche principale**

  

```

git clone https://github.com/gaetangr/frontdesk_V2/tree/main

```

  

- Créer un environnement virtuel

  

```

python -m venv venv

```

  

- Installer les dépendances

  

```

pip install -r requirements/local.txt

```

  - Créer une base de données sur postgres

  

```

create database frontdesk;

```


- Créer les fichiers de migrations

  

```

python manage.py migrate

```

  

- Créer un superuser

  

```

python manage.py createsuperuser

```

  

- Lancer le serveur

  

```

python manage.py runserver

```

  

## Pull request et contributions 📥

  

Front-desk est ouvert à la contribution pour son refactoring, voici quelques règles d'usage pour contribuer au projet:

  

- Les fonctions, commentaires, classes etc doivent être écrient en anglais

- Le code doit respecter les principes suivants KISS, DRY et de manière plus général la **Separation of concerns**.

- Utiliser le CI mis en place (soit Travis ou Github Action) et tester systématiquement les fonctions et classes

- Soyez exhaustif dans le message des commits et les PR

- Ne jamais push sur la branche main


## Outils 🛠

  

Ces outils sont utilisés pour le listing et le formatage du code, ces derniers sont inclus dans le contrôle d'intégration continue, si votre code ne respecte pas la PEP8 et le linting, le build échouera

  

- [Black](https://pypi.org/project/black/): Formatage du code

- [Flake8](https://pypi.org/project/flake8/): Suivi des conventions PEP8

- [Isort:](https://pypi.org/project/isort/) Formatage des imports

- [Travis CI](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjvgLaMn4ftAhVNxYUKHUqNBeIQFjAAegQIARAC&url=https://travis-ci.org/&usg=AOvVaw0DdLw907oMtHr1RJVmOZcl) & Github action pour le CI

  

## Contributeurs 💻

  

- **Gaëtan GROND** - _Idée originale et fondateur du projet_ - [GITHUB](<[https://github.com/Mcflan-7](https://github.com/Mcflan-7)>)

- **Chris pro** - _Conception du workspace, implémentation du package allauth_ - [GITHUB](<[https://github.com/chris-pro](https://github.com/chris-pro)>)