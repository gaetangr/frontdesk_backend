# ✨ Installer Front Desk - V2.0 ✨

Pour installer **Front Desk** sur votre machine local, suivez les instructions suivantes. 

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

  

Voici étape par étape comment installer front-desk sur votre machine, à noter que nous utilisons par défaut le gestionnaire de package **pipenv**, c'est l'outil recommandé pour le projet.

  

- Cloner mon repo **ne pas faire de push sur la branche principale**

  

```

git clone https://github.com/gaetangr/frontdesk_V2/tree/main

```

  

- Créer un environnement virtuel

  

```

python -m venv venv

```

**Ou avec pipenv**

```

pipenv shell

```

- Installer les dépendances

  

```

pip install -r requirements/local.txt

```

**Ou avec pipenv**

```

pipenv install -r requirements/local.txt

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

## Commandes utiles 💻
  
  Une fois les différents outils installés, vous pouvez utiliser les commandes suivantes:

  - Lancer la série de tests

```

coverage run -m pytest frontdesk

```

  - Générer le fichier de couverture HTML

```

coverage html

```

  - Formatte du code avec Black

```

black .

```

  - Trier les imports

```

isort frontdesk

```

  - S'assurer de la conformité PEP8

```

flake8 frontdesk

```
