const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const connection = () => {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST || "host.docker.internal",
        user: process.env.MYSQL_USER || "mysql",
        password: process.env.MYSQL_PWD || "Password123",
        database: "producer"
    });
}

// Configuration AMQP
const amqpHost = process.env.AMQP_HOST || "amqp://localhost";
const queueName = "utilisateurs";

// Fonction pour envoyer un message AMQP
const sendMessage = (message) => {
    amqp.connect(amqpHost, function(error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queueName, {
                durable: false
            });

            // Envoi du message à la file d'attente
            channel.sendToQueue(queueName, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
    });
};


// Route pour enregistrer les données du formulaire
app.post('/api/register', (req, res) => {
  const { firstname, lastname, email } = req.body;

  const db = connection()

    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données MySQL : ' + err.stack);
            return;
        }
        console.log('Connexion à la base de données MySQL établie avec l\'ID ' + db.threadId);

        // Insertion des données dans la table 'utilisateurs'
        db.query('INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)', [firstname, lastname, email], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'enregistrement : ' + err.stack);
                res.status(500).send('Erreur lors de l\'enregistrement dans la base de données.');
                return;
            }

            console.log('Utilisateur enregistré avec l\'ID ' + result.insertId);

            // Envoi d'un message AMQP après l'enregistrement de l'utilisateur
            const message = `${email}`;
            sendMessage(message);

            res.status(200).send('Utilisateur enregistré avec succès.');
        });
    })
});

// Port d'écoute de l'application
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
