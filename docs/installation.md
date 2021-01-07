## Start the journey 🚀

If you wish to get onboard with us, follow those instructions to get the project up and running in a no time

### What you need

- Use the following Python versio,
```
python 3.8.0 or above
```

```
Django==3.1.2 > or abose
```
- Always use PostgresSQL

### Installation


- Clone the repo (staging or develpoment branch)

```
git clone https://github.com/gaetangr/frontdesk
```

- Create a virtual env, choose pipenv or venv as you wish

```
python -m venv venv
```

- Install the requirements

```
pip install -r requirements.txt
```


- Create the migrations files

```
python manage.py migrate
```

- Create a superuser

```
python manage.py createsuperuser
```

- Launch the server 
```
python manage.py runserver --settings=config.settings.local
```

### You have questions ?

Feel free to contact us at contact@front-desk.fr