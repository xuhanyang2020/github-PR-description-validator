import * as core from "@actions/core";
import { getOctokit, context } from "@actions/github";

async function run() {
    const required_fields = core.getInput("required_fields")
    console.log("hello! " + required_fields)

    const token = core.getInput("github_token", { required: true });
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

run()