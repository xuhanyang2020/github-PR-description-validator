# Github Action to check PR description meets regex requirements

This PR fields validation action can be used to validate if PR decription satisfy the regex that developers provide
[![Build and Test Status](https://github.com/xuhanyang2020/xuhanyang2020/github-PR-description-validator/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/xuhanyang2020/xuhanyang2020/github-PR-description-validator/actions/workflows/build-and-test.yml)

### How to Use
Create a github action under `.github/workflow` directory in your repository.

```yaml
name: "Hello"

on:
  pull_request:
    types: [opened, synchronize, closed, reopened, edited]

jobs:
  pr-decription-regex-validator:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR with regex
        uses: xuhanyang2020/github-PR-description-validator@PR-regex-v2
        with:
          regex: "^.*Title[\\s\\S]+Description[\\s\\S]+$"
```

The `pull_request` event is needed, because it will use its payload.
You can customize the regex validation based on your requirement.

