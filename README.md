# Playwright API Testing Framework with Cucumber

A clean, scalable **API test automation framework** built using **Playwright**, **Cucumber (BDD)**, and **JavaScript**. This project demonstrates how to automate REST APIs (no UI) with reusable clients, schema validation, authentication handling, reporting, and CI integration using **GitHub Actions**.

---

## 🚀 Tech Stack

* **Playwright** – API testing (`request.newContext()`)
* **Cucumber (cucumber-js)** – BDD (`.feature` files)
* **JavaScript (ES Modules)**
* **AJV** – JSON Schema validation
* **Cucumber HTML Reporter**
* **GitHub Actions** – CI pipeline

---

## 📁 Project Structure

```
Playwright-api-testing-framework-cucumber
│
├── features
│   ├── *.feature                     # Gherkin feature files
│   ├── step-definitions              # Step definitions
│   └── support
│       ├── hooks.js                  # Before / After hooks
│       └── world.js                  # Custom World
│
├── src
│   ├── client
│   │   └── BookingClient.js           # API client methods
│   ├── config
│   │   └── env.config.js              # Environment configuration
│   ├── factory
│   │   ├── JsonFileLoader.js          # Load JSON files (schemas, payloads)
│   │   └── TestDataFactory.js         # Test data builders
│   ├── utils
│   │   ├── AuthToken.js               # Token generation & reuse
│   │   ├── SchemaValidator.js         # JSON schema validation (AJV)
│   │   └── BookingAssertions.js       # Custom assertions
│
├── schemas
│   └── booking_by_id_schema.json
│
├── reports
│   └── cucumber-report.html
│
├── .github/workflows
│   └── api-tests.yml                  # GitHub Actions workflow
│
├── package.json
└── README.md
```

---

## ✅ Features Covered

* Create / Retrieve / Update / Delete booking APIs
* Query bookings using filters (firstname + lastname)
* JSON Schema validation 
* Token-based authentication with reuse across scenarios
* Cucumber hooks and shared World
* HTML reporting
* CI execution via GitHub Actions
* Deploy Cucumber HTML report to GitHub Pages

---

## 🧪 Sample Feature

```gherkin
Scenario: Complete booking lifecycle
  Given a booking exists
  When I retrieve the booking
  And I update the booking details
  And I delete the booking
  Then the booking should no longer exist
```

---

## 🔐 Authentication Strategy

* Token is generated **once** and cached (similar to a static variable in Rest Assured)
* Reused across all scenarios in the test run

```js
let token = null;

export async function getAuthToken(apiRequest) {
  if (token) return token;

  const response = await apiRequest.post('/auth', {
    data: { username: 'admin', password: 'password123' }
  });

  const body = await response.json();
  token = body.token;
  return token;
}
```

---

## 📊 Reporting

* HTML Cucumber report generated after execution
* Path:

```
reports/cucumber-report.html
```

Run tests:

```bash
npm test
```

---

## ⚙️ Environment Configuration

Base URL is configurable via environment variables (CI-friendly):

```js
export const envConfig = {
  baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
};
```

---

## 🤖 GitHub Actions (CI)

Tests run automatically on:

* Push to `main` / `master`
* Pull requests
* Manual trigger (`workflow_dispatch`)

Cucumber reports are uploaded as workflow artifacts. Also they are deployed to GitHub Pages for direct viewing.

---

## ▶️ How to Run Locally

```bash
npm install
npm test
```

---

## 🧹 .gitignore Suggestions

```
node_modules
reports
.env
.env.*
playwright-report
```



⭐ If you find this useful, feel free to star the repository!
