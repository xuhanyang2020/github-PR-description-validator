"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
async function run() {
    const required_fields = (0, core_1.getInput)("required_fields");
    console.log("hello! " + required_fields);
}
run();
