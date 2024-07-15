import { connectTask } from "./task";
import { connectWorker } from "./worker";

export async function startTask() {
    await connectTask;
}
export async function startWorkerQueues() {
    await connectWorker();
}
