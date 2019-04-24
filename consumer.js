const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
         var queue = "FirstQueue";

         ch.assertQueue(queue, {durable: false});
         console.log('waiting meesage in ' + queue);
         ch.consume(queue, (message)=>{
            console.log(message);
         }, { noAck: true });
    });
});

app.listen(3001, () => {
    console.log('Start consumer at port 3001');
});