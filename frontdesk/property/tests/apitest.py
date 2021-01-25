import requests

r = requests.post('http://127.0.0.1:8000/api/v1/property/', data={"name": "test request", "collaborator": 3},headers={"Authorization": "Token ae749d7d221cb0e4f536e8db1fdcfd415ed88ed5"})
print(r.status_code)