
![Front Desk Build](https://github.com/gaetangr/frontdesk_V2/workflows/Front%20Desk%20Build/badge.svg)

![enter image description here](https://camo.githubusercontent.com/d91ed7ac7abbd5a6102cbe988dd8e9ac21bde0a73d97be7603b891ad08ce3479/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d626c61636b2d3030303030302e737667)

[![Foo](https://img.shields.io/twitter/url?label=Follow%20us&style=social&url=http%3A%2F%2Ftwitter.com%2FFrontDe87237671)](https://twitter.com/frontdesk_app)
[![Foo](https://img.shields.io/badge/Linkedin-Follow-blue)](https://www.linkedin.com/company/71615448/admin/)

# ✨ Front Desk - V2.0 ✨


Front-Desk.fr est une plateforme d'outils pour hôteliers 100% gratuite et open source : Cahier de consignes, registre de maintenance, gestion de plannings, notification et bien plus ...


L'outil est utilisé par les hôtels de grands groupes comme Accorhotels (majoritaire), Best Western, IHG, Mariotte International, Hilton Worlwide._

## Ressources internes 📚

Les liens suivants sont des ressources internes qui vous informent sur le projet (Front Desk V2), son périmètre d'action et la road map.

[Trello - RoadMap](https://trello.com/b/C4oeeKc3/front-desk-road-map)

[Cahier des charges](https://we.tl/t-8xm1js1TIB)

[Dossier de conception fonctionnelle](https://we.tl/t-vgcr1bGq0w)


## Se lancer dans le projet 🚀


Les instructions suivantes vous permettront de vous lancer dans le projet et de le faire tourner sur votre machine avec les bons outils, merci d'en prendre connaissance avant toute pull request.


### Prérequis


- Vérifier la version de Python et Django



```
python 3.8.0 ou supérieur
```


```
Django==3.1.2 ou  supérieur
```


- Vérifier que vous utilisez bien le moteur de BDD Postgresql


### Installation back-end

Voici étape par étape comment installer Front Desk sur votre machine, à noter que nous utilisons par défaut le gestionnaire de package **pipenv**, c'est l'outil recommandé pour le projet.


- Cloner mon repo


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
python manage.py super_account
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
