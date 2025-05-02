import * as core from "@actions/core";
import { context } from "@actions/github";
import { run } from "../src/index";

jest.mock("@actions/core");
jest.mock("@actions/github");

describe("run function", () => {
    const mockGetInput = core.getInput as jest.Mock;
    const mockInfo = core.info as jest.Mock;
    const mockSetFailed = core.setFailed as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetInput.mockImplementation((name: string) => {
            if (name === "regex") return "test.*";
            if (name === "github_token") return "fake-token";
            return "";
        });

        (context as any).payload = {
            action: "opened",
            pull_request: {
                body: "This is a test description",
            },
            sender: {
                login: "test-user",
            },
        };
    });

    it("should pass when the pull request description matches the regex", async () => {
        await run();

        expect(mockInfo).toHaveBeenCalledWith("PR created by test-user");
        expect(mockInfo).toHaveBeenCalledWith("Pull request description matches the regex.");
        expect(mockSetFailed).not.toHaveBeenCalled();
    });

    it("should fail when the pull request description does not match the regex", async () => {
        mockGetInput.mockImplementation((name: string) => {
            if (name === "regex") return "nomatch.*";
            return "";
        });

        await run();

        expect(mockInfo).toHaveBeenCalledWith("PR created by test-user");
        expect(mockSetFailed).toHaveBeenCalledWith("Pull request description does not match the required format.");
    });

    it("should fail when the pull request description is empty", async () => {
        (context as any).payload.pull_request.body = "";

        await run();

        expect(mockSetFailed).toHaveBeenCalledWith("Pull request description does not match the required format.");
    });

    it("should throw an error if the event is not a pull request", async () => {
        (context as any).payload.action = "closed";

        await expect(run()).rejects.toThrow("This action only works for pull request events");
    });

    it("should handle missing sender information gracefully", async () => {
        (context as any).payload.sender = undefined;

        await run();

        expect(mockInfo).toHaveBeenCalledWith("PR created by undefined");
    });
});