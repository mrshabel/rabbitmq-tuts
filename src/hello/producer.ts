import amqplib from "amqplib/callback_api";

export async function connectProducer() {
    try {
        amqplib.connect("amqp://localhost", function (error0, connection) {
            // check for error
            if (error0) {
                throw error0;
            }

            // create the connection channel
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                const queue = "hello";
                const message = "hello world";

                // assert the queue
                channel.assertQueue(queue, { durable: false });

                // send the message to the queue
                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", message);
            });
            // connection.close();
        });
    } catch (error) {
        console.error(error);
    }
}
