Automated testing project for the **Inforce** platform using [Playwright](https://playwright.dev/) and [Allure](https://docs.qameta.io/allure/) for test reporting.

This project contains UI and API test coverage to ensure the stability, correctness, and quality of the application.

Installation

Make sure you have [Node.js](https://nodejs.org/) installed (v16 or later recommended).

1. Clone the repository or extract the archive:
git clone <repo-url> && cd inforce_aqa

Install dependencies:
npm install

Running Tests

Run all tests:
npx playwright test
Run a specific test:

npx playwright test tests/test_api.spec.ts
You can also use test name filtering:

npx playwright test -g "name of the test"
Allure Reporting
This project supports Allure reports for advanced result visualization.

1. Install Allure Commandline:
npm install -D allure-commandline
Note: If you want to install Allure globally on Windows, use:
choco install allure

npm run allure:report
Or step-by-step:

npm run allure:generate   - Generate report from results
npm run allure:open       - Open the report in your browser

Allure output folders:
Raw test results: ./allure-results
HTML report: ./allure-report


Dependencies:
@playwright/test
allure-playwright
allure-commandline

Tips
Use --headed to see the browser during test execution:
npx playwright test --headed
Use --trace on to enable Playwright tracing for debugging.
