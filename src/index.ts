import * as core from "@actions/core";
import { context } from "@actions/github";

export async function run() {
    const regexInput = core.getInput("regex");
    const regex = new RegExp(regexInput);

    const payload = context.payload;

    const senderInfo = payload?.sender;
    const senderName = senderInfo?.login;

    core.info(`PR created by ${senderName}`)

    if (!context.payload.pull_request) {
        core.setFailed("Is not a pull request, skipping");
        return;
    }
    const pull_request_decrption = context.payload.pull_request?.body ?? ""

    const matches = regex.test(pull_request_decrption); // Test the regex against the description
    if (matches) {
        core.info("Pull request description matches the regex.");
    } else {
        core.setFailed("Pull request description does not match the required format.");
    }
}

if (!process.env.JEST_WORKER_ID) {
    run();
  }