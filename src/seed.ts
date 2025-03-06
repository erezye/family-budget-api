import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import { UserModel, BudgetModel } from './models';

dotenv.config();

async function seed() {
  try {
    // Connect to MongoDB
    await connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/family-budget');
    console.log('Connected to MongoDB');

    // Clear existing data
    await UserModel.deleteMany({});
    await BudgetModel.deleteMany({});
    console.log('Cleared existing data');

    // Create a user
    const user = await UserModel.create({
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
      monthlyIncome: 30000
    });
    console.log('Created user:', user);

    // Create a budget for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentYear = currentDate.getFullYear();

    const budget = await BudgetModel.create({
      userId: user.id,
      month: currentMonth,
      year: currentYear,
      income: 30000,
      expenses: 20500,
      items: [
        {
          name: 'Salary',
          amount: 30000,
          category: 'Income',
          isIncome: true,
          date: currentDate
        },
        {
          name: 'Rent',
          amount: 6000,
          category: 'Housing',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Mortgage',
          amount: 3500,
          category: 'Housing',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Groceries',
          amount: 3000,
          category: 'Food',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Dining out',
          amount: 1500,
          category: 'Food',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Utilities',
          amount: 1000,
          category: 'Housing',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Internet & TV',
          amount: 500,
          category: 'Utilities',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Transportation',
          amount: 1500,
          category: 'Transportation',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Entertainment',
          amount: 1500,
          category: 'Entertainment',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Shopping',
          amount: 1000,
          category: 'Shopping',
          isIncome: false,
          date: currentDate
        },
        {
          name: 'Health Insurance',
          amount: 1000,
          category: 'Health',
          isIncome: false,
          date: currentDate
        }
      ]
    });
    console.log('Created budget:', budget);

    // Create a budget for the previous month
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const previousDate = new Date(previousYear, previousMonth - 1, 15);

    const previousBudget = await BudgetModel.create({
      userId: user.id,
      month: previousMonth,
      year: previousYear,
      income: 30000,
      expenses: 22000,
      items: [
        {
          name: 'Salary',
          amount: 30000,
          category: 'Income',
          isIncome: true,
          date: previousDate
        },
        {
          name: 'Rent',
          amount: 6000,
          category: 'Housing',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Mortgage',
          amount: 3500,
          category: 'Housing',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Groceries',
          amount: 3200,
          category: 'Food',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Dining out',
          amount: 2000,
          category: 'Food',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Utilities',
          amount: 1200,
          category: 'Housing',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Internet & TV',
          amount: 500,
          category: 'Utilities',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Transportation',
          amount: 1800,
          category: 'Transportation',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Entertainment',
          amount: 1800,
          category: 'Entertainment',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Shopping',
          amount: 1200,
          category: 'Shopping',
          isIncome: false,
          date: previousDate
        },
        {
          name: 'Health Insurance',
          amount: 800,
          category: 'Health',
          isIncome: false,
          date: previousDate
        }
      ]
    });
    console.log('Created previous budget:', previousBudget);

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();