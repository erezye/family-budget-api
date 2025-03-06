import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { BudgetController } from '../src/controllers';
import { BudgetModel } from '../src/models';
import { Budget } from '../src/types';

describe('BudgetController', () => {
  let budgetController: BudgetController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let budgetModel: Model<Budget>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    budgetModel = mongoConnection.model(BudgetModel.name, BudgetModel.schema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        {
          provide: BudgetModel.name,
          useValue: budgetModel,
        },
      ],
    }).compile();

    budgetController = module.get<BudgetController>(BudgetController);
  });

  afterAll(async () => {
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await budgetModel.deleteMany({});
  });

  describe('create', () => {
    it('should create a budget with monthly income of 30,000 ILS', async () => {
      const budget = {
        userId: '123',
        month: 3,
        year: 2023,
        income: 30000,
        expenses: 0,
        items: []
      } as Budget;

      const result = await budgetController.create(budget);
      
      expect(result).toBeDefined();
      expect(result.income).toBe(30000);
      expect(result.userId).toBe('123');
    });
  });

  describe('getBudgetSummary', () => {
    it('should return the budget summary', async () => {
      // Create a budget
      const budget = await budgetModel.create({
        userId: '123',
        month: 3,
        year: 2023,
        income: 30000,
        expenses: 15000,
        items: [
          {
            name: 'Salary',
            amount: 30000,
            category: 'Income',
            isIncome: true,
            date: new Date()
          },
          {
            name: 'Rent',
            amount: 5000,
            category: 'Housing',
            isIncome: false,
            date: new Date()
          },
          {
            name: 'Groceries',
            amount: 3000,
            category: 'Food',
            isIncome: false,
            date: new Date()
          },
          {
            name: 'Dining out',
            amount: 2000,
            category: 'Food',
            isIncome: false,
            date: new Date()
          },
          {
            name: 'Utilities',
            amount: 1000,
            category: 'Housing',
            isIncome: false,
            date: new Date()
          },
          {
            name: 'Transportation',
            amount: 2000,
            category: 'Transportation',
            isIncome: false,
            date: new Date()
          },
          {
            name: 'Entertainment',
            amount: 2000,
            category: 'Entertainment',
            isIncome: false,
            date: new Date()
          }
        ]
      });

      const result = await budgetController.getBudgetSummary(budget._id.toString());
      
      expect(result).toBeDefined();
      expect(result.totalIncome).toBe(30000);
      expect(result.totalExpenses).toBe(15000);
      expect(result.balance).toBe(15000);
      expect(result.expensesByCategory).toEqual({
        Housing: 6000,
        Food: 5000,
        Transportation: 2000,
        Entertainment: 2000
      });
    });
  });
});