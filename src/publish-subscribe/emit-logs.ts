import amqplib from "amqplib/callback_api";

export async function emitLog() {
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
                const message = "Hello";

                // assert the exchange
                channel.assertExchange(exchange, "fanout", {
                    durable: false,
                });

                // publish message to the exchange
                channel.publish(exchange, "", Buffer.from(message), {
                    persistent: true,
                });

                console.log(` [x] Sent ${message}`);
            });
            // close the connection when the timeout expires
            setTimeout(
                () =>
                    connection.close(function (error2) {
                        if (error2) {
                            throw error2;
                        }

                        process.exit(1);
                    }),
                4000
            );
        });
    } catch (error) {
        console.error(error);
    }
}

emitLog();
