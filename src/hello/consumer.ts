import amqplib from "amqplib/callback_api";

export async function connectConsumer() {
    try {
        // create the connection
        amqplib.connect("amqp://localhost", function (error0, connection) {
            if (error0) {
                throw error0;
            }

            // create a connection channel
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                const queue = "hello";

                // assert the queue making sure that the queue is first created before attempting any operation on it
                channel.assertQueue(queue, {
                    durable: false,
                });

                // wait for message
                console.log(" [*] waiting for messages in %s", queue);

                // consume message from the queue
                channel.consume(
                    queue,
                    function (message) {
                        console.log(
                            " [x] Received %s",
                            message?.content.toString()
                        );
                    },
                    {
                        noAck: true,
                    }
                );
            });
        });
    } catch (error) {
        console.error(error);
    }
}
