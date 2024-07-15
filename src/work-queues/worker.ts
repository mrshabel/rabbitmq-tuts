import amqplib from "amqplib/callback_api";

export async function connectWorker() {
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

                const queue = "task_queue";

                // assert the queue making sure that the queue is first created before attempting any operation on it
                channel.assertQueue(queue, {
                    durable: false,
                });

                // ensure that only one message is being processed at a time
                channel.prefetch(1);

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

                        setTimeout(function () {
                            // acknowledge message
                            channel.ack(message!);
                        }, 2000);
                    },
                    {
                        noAck: false,
                    }
                );
            });
        });
    } catch (error) {
        console.error(error);
    }
}

connectWorker();
