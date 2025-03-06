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
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
const models_1 = require("./models");
dotenv.config();
async function seed() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/family-budget');
        console.log('Connected to MongoDB');
        await models_1.UserModel.deleteMany({});
        await models_1.BudgetModel.deleteMany({});
        console.log('Cleared existing data');
        const user = await models_1.UserModel.create({
            email: 'user@example.com',
            password: 'password123',
            name: 'Test User',
            monthlyIncome: 30000
        });
        console.log('Created user:', user);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const budget = await models_1.BudgetModel.create({
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
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        const previousDate = new Date(previousYear, previousMonth - 1, 15);
        const previousBudget = await models_1.BudgetModel.create({
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
    }
    catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map