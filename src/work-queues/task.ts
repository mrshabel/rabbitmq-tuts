import amqplib from "amqplib/callback_api";

export async function connectTask() {
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

                const queue = "task_queue";

                // assert the queue
                channel.assertQueue(queue, { durable: false });

                for (let index = 0; index < 7; index++) {
                    const message = `Message number ${index}`;

                    // send the message to the queue
                    channel.sendToQueue(queue, Buffer.from(message), {
                        persistent: true,
                    });

                    console.log(` [x] Sent ${message}`);
                }
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

connectTask();
