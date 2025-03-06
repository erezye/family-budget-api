import { Controller, Get, Post, Body, Param, Put, Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget, BudgetItem, BudgetSummary, BudgetDto, BudgetItemDto, BudgetSummaryDto } from '../types';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Injectable()
@ApiTags('budgets')
@Controller('budgets')
export class BudgetController {
  constructor(
    @InjectModel('Budget') private readonly budgetModel: Model<Budget>
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all budgets', description: 'Returns a list of all available budgets' })
  @ApiResponse({ status: 200, description: 'List of budgets', type: [BudgetDto] })
  async findAll(): Promise<Budget[]> {
    return this.budgetModel.find().lean();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get budget by ID', description: 'Returns a single budget by its ID' })
  @ApiParam({ name: 'id', description: 'Budget ID' })
  @ApiResponse({ status: 200, description: 'The found budget', type: BudgetDto })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  async findOne(@Param('id') id: string): Promise<Budget> {
    return this.budgetModel.findById(id).lean();
  }

  @Get('summary/:id')
  @ApiOperation({ summary: 'Get budget summary', description: 'Returns a summary of income, expenses, and categories for a budget' })
  @ApiParam({ name: 'id', description: 'Budget ID' })
  @ApiResponse({ status: 200, description: 'Budget summary', type: BudgetSummaryDto })
  @ApiResponse({ status: 404, description: 'Budget not found' })
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
  @ApiOperation({ summary: 'Create a new budget', description: 'Creates a new monthly budget with initial values' })
  @ApiBody({ type: BudgetDto, description: 'Budget data' })
  @ApiResponse({ status: 201, description: 'The created budget', type: BudgetDto })
  @ApiResponse({ status: 400, description: 'Invalid budget data' })
  async create(@Body() budget: Budget): Promise<Budget> {
    const newBudget = new this.budgetModel(budget);
    return newBudget.save();
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add item to budget', description: 'Adds a new transaction (income or expense) to a budget' })
  @ApiParam({ name: 'id', description: 'Budget ID' })
  @ApiBody({ type: BudgetItemDto, description: 'Budget item data' })
  @ApiResponse({ status: 200, description: 'The updated budget', type: BudgetDto })
  @ApiResponse({ status: 404, description: 'Budget not found' })
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
  @ApiOperation({ summary: 'Update a budget', description: 'Updates an existing budget with new values' })
  @ApiParam({ name: 'id', description: 'Budget ID' })
  @ApiBody({ type: BudgetDto, description: 'Updated budget data' })
  @ApiResponse({ status: 200, description: 'The updated budget', type: BudgetDto })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  async update(
    @Param('id') id: string,
    @Body() budget: Budget
  ): Promise<Budget> {
    return this.budgetModel.findByIdAndUpdate(id, budget, { new: true }).lean();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a budget', description: 'Deletes a budget and all its items' })
  @ApiParam({ name: 'id', description: 'Budget ID' })
  @ApiResponse({ status: 200, description: 'The deleted budget', type: BudgetDto })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  async remove(@Param('id') id: string): Promise<Budget> {
    return this.budgetModel.findByIdAndDelete(id).lean();
  }

  @Delete(':budgetId/items/:itemId')
  @ApiOperation({ summary: 'Delete a budget item', description: 'Removes a transaction from a budget' })
  @ApiParam({ name: 'budgetId', description: 'Budget ID' })
  @ApiParam({ name: 'itemId', description: 'Budget item ID' })
  @ApiResponse({ status: 200, description: 'The updated budget', type: BudgetDto })
  @ApiResponse({ status: 404, description: 'Budget or item not found' })
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