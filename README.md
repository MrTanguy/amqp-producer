# Producer AMQP

Le but de ce projet est de renseigner un user en bdd via une requête POST puis de stocker en queue sur RabbitMQ l'adresse mail utilisée

## Démarrer avec Docker

- WSL2 : [installation](https://learn.microsoft.com/fr-fr/windows/wsl/install)
- Docker : [installation](https://www.docker.com/products/docker-desktop/)
- Postman : [installation](https://www.postman.com/downloads/)

### Initialisation 

Recupérer le repository via `git clone https://github.com/MrTanguy/amqp-producer.git`

Se rendre dans le dossier `cd .\amqp-producer\`

Utiliser la branch dev `git checkout dev`

Lancer la commande `docker-compose up`

PS : Un nouveau container devrait apparaître dans Docker Desktop

Depuis postman, exécuter une requête post sur `http://localhost:3000/api/register` avec ce body :  

`
{
    "firstname": "Test",
    "lastname": "Test",
    "email": "test.test@gmail.com"
}
`

Se rendre sur `http://localhost:15672/#/queues/%2F/logQueue` pour voir si le message a bien été envoyé.

Pour la suite, se rendre [ici](https://github.com/MrTanguy/amqp-consumer/tree/dev)
