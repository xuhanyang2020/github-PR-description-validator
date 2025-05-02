import * as core from "@actions/core";
import { getOctokit, context } from "@actions/github";

export async function run() {
    const required_fields = core.getInput("required_fields")
    console.log("hello! " + required_fields)

    const token = core.getInput("github_token", { required: true });

    if (!token || token === "") {
        throw new Error("GitHub token is required");
    }
    
    const octokit = getOctokit(token);

    const payload = context.payload;

    const senderInfo = payload?.sender;
    const senderName = senderInfo?.login;
    const senderType = senderInfo?.type;

    console.log("senderInfo: ", senderInfo);
    console.log("senderName: ", senderName);
    console.log("senderType: ", senderType);

    core.info(`PR created by ${senderName} (${senderType})`)
}

if (!process.env.JEST_WORKER_ID) {
    run();
  }