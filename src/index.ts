import { getInput } from "@actions/core"

const required_fields = getInput("required_fields")

console.log("hello" + required_fields)