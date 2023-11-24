const amqp = require('amqplib');

// Configuration AMQP
const amqpHost = process.env.AMQP_HOST || 'amqp://host.docker.internal';
const exchangeName = 'logExchange';
const routingKey = 'info';

class Producer {
  constructor() {
    this.channel = null;
  }

  async createChannel() {
    const connection = await amqp.connect(amqpHost);
    this.channel = await connection.createChannel();
  }

  async publishMessage(message) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel.assertExchange(exchangeName, 'direct', { durable: false });
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(
        JSON.stringify({
          logType: 'info',
          message: message,
          dateTime: new Date().toISOString(),
        })
      )
    );

    console.log(`${message} sent!`);
  }
}

module.exports = Producer;
