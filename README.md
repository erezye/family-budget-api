# Family Budget API

A RESTful API for managing family budgets, built with NestJS, TypeScript, and MongoDB. This API allows families to track income, expenses, and get budget summaries with a default monthly income of 30,000 ILS.

## Description

The Family Budget API provides a complete backend solution for budget management, including:

- Creating and managing monthly budgets
- Adding income and expense transactions
- Categorizing expenses (housing, food, utilities, etc.)
- Calculating budget summaries and balances
- Managing user profiles with default income settings

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB
- **Testing**: Jest
- **Validation**: class-validator, class-transformer
- **Environment**: dotenv

## Project Structure

```
family-budget-api/
├── src/                     # Source code
│   ├── controllers/         # API request handlers
│   │   ├── budget.controller.ts
│   │   ├── user.controller.ts
│   │   └── index.ts
│   ├── models/              # MongoDB schema definitions
│   │   ├── budget.model.ts
│   │   ├── user.model.ts
│   │   └── index.ts
│   ├── types/               # Type definitions
│   │   ├── budget.ts
│   │   ├── user.ts
│   │   └── index.ts
│   ├── app.module.ts        # Main application module
│   └── main.ts              # Application entry point
├── test/                    # Test files
├── dist/                    # Compiled output
├── node_modules/            # Dependencies
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Jest configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## API Endpoints

### Budgets

- `GET /budgets` - Get all budgets
- `GET /budgets/:id` - Get a specific budget
- `GET /budgets/summary/:id` - Get a budget summary with expense categories
- `POST /budgets` - Create a new budget
- `PUT /budgets/:id` - Update a budget
- `DELETE /budgets/:id` - Delete a budget
- `POST /budgets/:id/items` - Add a transaction to a budget
- `DELETE /budgets/:budgetId/items/:itemId` - Remove a transaction from a budget

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/family-budget-api.git
   cd family-budget-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/family-budget
   DEFAULT_MONTHLY_INCOME=30000
   ```

### Running the Application

1. Development mode:
   ```bash
   npm run dev
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Production mode:
   ```bash
   npm start
   ```

4. Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Sample Data

The seed script creates a user and sample budgets for demonstration purposes:

- Default monthly income: 30,000 ILS
- Sample expense categories: Housing, Food, Transportation, Utilities, etc.
- Multiple months of budget history

## Dependencies

Main dependencies:

```
"dependencies": {
  "@nestjs/common": "^11.0.11",
  "@nestjs/core": "^11.0.11",
  "@nestjs/mongoose": "^11.0.1",
  "@nestjs/platform-express": "^11.0.11",
  "class-transformer": "^0.5.1",
  "class-validator": "^0.14.1",
  "dotenv": "^16.4.7",
  "mongoose": "^8.12.1",
  "reflect-metadata": "^0.2.2"
}
```

Development dependencies:

```
"devDependencies": {
  "@types/express": "^5.0.0",
  "@types/jest": "^29.5.14",
  "@types/node": "^22.13.9",
  "jest": "^29.7.0",
  "mongodb-memory-server": "^10.1.4",
  "nodemon": "^3.1.9",
  "supertest": "^7.0.0",
  "ts-jest": "^29.2.6",
  "typescript": "^5.8.2"
}
```

## License

ISC