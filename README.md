# EzyMetrics Internship Assignment

### **Task:**

Build a Backend for EzyMetrics Focusing on Data Integrations and Reporting

### Requirements:

1. **API Service Development:**
    - Integrate with dummy CRM and Marketing platforms.
    - Simulate fetching lead and campaign data via dummy data.
2. Data Storage and Processing:
    - Use a relational or NoSQL database to store the fetched data.
    - Build an ETL process to transform raw data into meaningful metrics.
3. Reporting and Alerts:
    - Implement an API endpoint to generate reports (PDF/CSV).
    - Include basic email notifications for alerts when certain conditions are met.
4. Submission:
    - GitHub repository link for the API.
    - README detailing API usage and instructions.

## Getting Started:

### Technologies Used:

-   **Core**

    -   **Node.js** - JavaScript runtime built on Chrome's V8 JavaScript engine.
    -   **TypeScript** - Typed superset of JavaScript that compiles to plain JavaScript.
    -   **Hono** - Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.
    -   **Drizzle ORM** - A simple, lightweight, type-safe and fast ORM for Node.js.
    -   **Postgres** - Open-source relational database system.
    -   **Zod** - TypeScript-first schema declaration and validation library.
    -   **React Email** - A library for building responsive email templates.
    -   **T3 ENV** - A library for managing environment variables in TypeScript.
    -   **NodeMailer** - A module for Node.js applications to allow easy email sending.

-   **Development**
    -   **Bun** - A simple, fast, and lightweight build tool for Node.js.
    -   **Drizzle Kit** - A CLI tool for generating and managing database migrations.
    -   **ESLint** - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
    -   **Total TypeScript** - A TypeScript configuration for projects.
    -   **Prettier** - An opinionated code formatter.

> ### Notes:
>
> -   This project uses locally hosted Postgres database.
> -   Instead of Express, this project uses Hono, a lightweight alternative.
> -   The project uses Drizzle ORM for database operations.
> -   The project uses Zod for schema validation.
> -   This project uses Nodemailer with Gmail SMTP for sending emails.

### Installation:

1. Clone the repository:

    ```bash
    git clone <REPO_URL>
    ```

2. Install the dependencies:

    ```bash
    # Using npm
    npm install

    # Using yarn
    yarn install

    # Using pnpm
    pnpm install

    # Using bun
    bun install
    ```

3. Set up the environment variables:

    ```bash
    cp .env.example .env
    ```

4. Running the migrations:

    ```bash
    # Using bun
    bun run db:mig
    ```

5. Start the development server:

    ```bash
    # Using bun
    bun run dev
    ```

6. Access the API at `http://localhost:3001`.
7. Open Postman and import the collection from the `postman` directory.
8. The base API URL is `http://localhost:3001/api/v1`.

### API Endpoints:

Visit the [API Documentation](/API_DOCS.md) for more information.

## Connect with me

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/itsdrvgo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/itsdrvgo)
[![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/itsdrvgo)
[![X](https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white)](https://x.com/itsdrvgo)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@itsdrvgodev)
