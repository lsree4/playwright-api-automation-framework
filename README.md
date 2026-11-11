# Playwright API Automation Framework

## 1. Project Overview

This project demonstrates API test automation using Playwright and TypeScript.

The framework uses reusable API classes, custom Playwright fixtures, environment configuration and automated test reporting.

### APIs Covered
- Posts API
- Comments API

### Key Features
- GET, POST, PUT, PATCH and DELETE requests.
- Reusable API classes.
- Custom Playwright fixtures.
- TypeScript interfaces.
- Separate test data management.
- Environment configuration using dotenv.
- HTML test reporting.
- Positive and negative API testing.

## 2. Project Structure

```text
PlaywrightLearning/
├── api/
│   ├── postapi.ts
│   ├── commentsapi.ts
│   └── post.types.ts
├── Data/
│   └── post.data.ts
├── fixtures/
│   └── api.fixture.ts
├── pages/
│   └── DemoBankPage.ts
├── tests/
│   ├── api-framework.spec.ts
│   ├── api-learning.spec.ts
│   └── other test files
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## 3. Installation

Clone the repository and install dependencies:

```bash
npm install
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## 4. Environment Configuration

Create a `.env` file in the project root using `.env.example` as a template.

Configure the API base URL:

```text
API_BASE_URL=https://jsonplaceholder.typicode.com
```

Do not commit the `.env` file to GitHub.

## 5. Running Tests

Run the API automation framework:

```bash
npx playwright test api-framework.spec.ts --project=chromium
```

Run all tests configured for Chromium:

```bash
npx playwright test --project=chromium
```

## 6. HTML Test Reporting

Generate and view the Playwright HTML report:

```bash
npx playwright show-report
```

## 7. Technologies Used

- Playwright Test
- TypeScript
- Node.js
- npm
- dotenv
- JSONPlaceholder REST API