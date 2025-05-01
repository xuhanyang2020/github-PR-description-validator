import { getInput } from "@actions/core"
import { getOctokit, context } from "@actions/github";

async function run() {
    const required_fields = getInput("required_fields")

    console.log("hello! " + required_fields)
}

run()