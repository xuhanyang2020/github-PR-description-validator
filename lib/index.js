"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
async function run() {
    var _a, _b, _c;
    const regexInput = core.getInput("regex");
    const regex = new RegExp(regexInput);
    const payload = github_1.context.payload;
    const senderInfo = payload === null || payload === void 0 ? void 0 : payload.sender;
    const senderName = senderInfo === null || senderInfo === void 0 ? void 0 : senderInfo.login;
    core.info(`PR created by ${senderName}`);
    const has_pull_request = ((_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.body) !== undefined;
    if (!has_pull_request) {
        core.setFailed("Is not a pull request, skipping");
        return;
    }
    const pull_request_decrption = (_c = (_b = github_1.context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.body) !== null && _c !== void 0 ? _c : "";
    const matches = regex.test(pull_request_decrption); // Test the regex against the description
    if (matches) {
        core.info("Pull request description matches the regex.");
    }
    else {
        core.setFailed("Pull request description does not match the required format.");
    }
}
if (!process.env.JEST_WORKER_ID) {
    run();
}
