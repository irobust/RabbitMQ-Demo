const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'FirstQueue';
        var message = { 
            firstName: 'John',
            lastName: 'Doe'
        }

        ch.assertQueue(queue, { durable: false });
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log('message was sent!');
    });

    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
});

app.listen(3000, () => {
    console.log('Start publisher at port 3000');
});