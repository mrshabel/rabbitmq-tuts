import amqplib from "amqplib/callback_api";

export async function receiveLogs() {
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

                const exchange = "logs";

                // assert the exchange
                channel.assertExchange(exchange, "fanout", {
                    durable: false,
                });

                // assert queue
                channel.assertQueue(
                    "",
                    { exclusive: true },
                    function (error2, q) {
                        if (error2) {
                            throw error2;
                        }

                        console.log(
                            " [*] Waiting for messages in %s. To exit press CTRL+C",
                            q.queue
                        );

                        // consume the message
                        channel.consume(
                            "",
                            function (message) {
                                if (message?.content) {
                                    console.log(
                                        ` [x] ${message.content.toString()}`
                                    );
                                }
                            },
                            { noAck: true }
                        );
                    }
                );
            });
        });
    } catch (error) {
        console.error(error);
    }
}

receiveLogs();
