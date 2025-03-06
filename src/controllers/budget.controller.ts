import { Controller, Get, Post, Body, Param, Put, Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget, BudgetItem, BudgetSummary } from '../types';

@Injectable()
@Controller('budgets')
export class BudgetController {
  constructor(
    @InjectModel('Budget') private readonly budgetModel: Model<Budget>
  ) {}

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.budgetModel.find().lean();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Budget> {
    return this.budgetModel.findById(id).lean();
  }

  @Get('summary/:id')
  async getBudgetSummary(@Param('id') id: string): Promise<BudgetSummary> {
    const budget = await this.budgetModel.findById(id).lean();
    
    const totalIncome = budget.items
      .filter(item => item.isIncome)
      .reduce((sum, item) => sum + item.amount, 0);
    
    const totalExpenses = budget.items
      .filter(item => !item.isIncome)
      .reduce((sum, item) => sum + item.amount, 0);
    
    const expensesByCategory = budget.items
      .filter(item => !item.isIncome)
      .reduce((categories, item) => {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
        return categories;
      }, {} as Record<string, number>);
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      expensesByCategory
    };
  }

  @Post()
  async create(@Body() budget: Budget): Promise<Budget> {
    const newBudget = new this.budgetModel(budget);
    return newBudget.save();
  }

  @Post(':id/items')
  async addBudgetItem(
    @Param('id') id: string,
    @Body() item: BudgetItem
  ): Promise<Budget> {
    const budget = await this.budgetModel.findById(id);
    
    budget.items.push(item);
    
    // Update the income or expenses
    if (item.isIncome) {
      budget.income += item.amount;
    } else {
      budget.expenses += item.amount;
    }
    
    return budget.save();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() budget: Budget
  ): Promise<Budget> {
    return this.budgetModel.findByIdAndUpdate(id, budget, { new: true }).lean();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Budget> {
    return this.budgetModel.findByIdAndDelete(id).lean();
  }

  @Delete(':budgetId/items/:itemId')
  async removeBudgetItem(
    @Param('budgetId') budgetId: string,
    @Param('itemId') itemId: string
  ): Promise<Budget> {
    const budget = await this.budgetModel.findById(budgetId);
    
    const itemIndex = budget.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const item = budget.items[itemIndex];
      
      // Update the income or expenses
      if (item.isIncome) {
        budget.income -= item.amount;
      } else {
        budget.expenses -= item.amount;
      }
      
      // Remove the item
      budget.items.splice(itemIndex, 1);
    }
    
    return budget.save();
  }
}