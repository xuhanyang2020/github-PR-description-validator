import * as core from "@actions/core";
import { getOctokit, context } from "@actions/github";
import { run } from "../src/index";

jest.mock("@actions/core");
jest.mock("@actions/github");

describe("process function", () => {
    const mockGetInput = core.getInput as jest.Mock;
    const mockInfo = core.info as jest.Mock;
    const mockGetOctokit = getOctokit as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetInput.mockImplementation((name: string) => {
            if (name === "required_fields") return "field1,field2";
            if (name === "github_token") return "fake-token";
            return "";
        });

        (context as any).payload = {
            sender: {
                login: "test-user",
                type: "User",
            },
        };

        mockGetOctokit.mockReturnValue({
            rest: {
                pulls: {
                    list: jest.fn(),
                },
            },
        });
    });

    it("should log required fields and sender information", async () => {
        const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

        await run();

        expect(mockGetInput).toHaveBeenCalledWith("required_fields");
        expect(mockGetInput).toHaveBeenCalledWith("github_token", { required: true });
        expect(consoleLogSpy).toHaveBeenCalledWith("hello! field1,field2");
        expect(consoleLogSpy).toHaveBeenCalledWith("senderInfo: ", { login: "test-user", type: "User" });
        expect(consoleLogSpy).toHaveBeenCalledWith("senderName: ", "test-user");
        expect(consoleLogSpy).toHaveBeenCalledWith("senderType: ", "User");
        expect(mockInfo).toHaveBeenCalledWith("PR created by test-user (User)");

        consoleLogSpy.mockRestore();
    });

    it("should throw an error if github_token is missing", async () => {
        mockGetInput.mockImplementation((name: string) => {
            if (name === "required_fields") return "field1,field2";
            if (name === "github_token") return "";
            return "";
        });

        await expect(run()).rejects.toThrow("GitHub token is required");
    });

    it("should handle missing sender information gracefully", async () => {
        (context as any).payload = {};

        const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

        await run();

        expect(consoleLogSpy).toHaveBeenCalledWith("senderInfo: ", undefined);
        expect(consoleLogSpy).toHaveBeenCalledWith("senderName: ", undefined);
        expect(consoleLogSpy).toHaveBeenCalledWith("senderType: ", undefined);
        expect(mockInfo).toHaveBeenCalledWith("PR created by undefined (undefined)");

        consoleLogSpy.mockRestore();
    });

    it("should handle empty required_fields input", async () => {
        mockGetInput.mockImplementation((name: string) => {
            if (name === "required_fields") return "";
            if (name === "github_token") return "fake-token";
            return "";
        });

        const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

        await run();

        expect(consoleLogSpy).toHaveBeenCalledWith("hello! ");
        consoleLogSpy.mockRestore();
    });
});