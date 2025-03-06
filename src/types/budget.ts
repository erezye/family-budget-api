import { ApiProperty } from '@nestjs/swagger';

export class BudgetItemDto {
  @ApiProperty({ description: 'Unique identifier for the budget item' })
  id: string;

  @ApiProperty({ description: 'Name of the budget item', example: 'Groceries' })
  name: string;

  @ApiProperty({ description: 'Amount in ILS', example: 3000 })
  amount: number;

  @ApiProperty({ description: 'Category of the budget item', example: 'Food' })
  category: string;

  @ApiProperty({ description: 'Whether this is income or expense', example: false })
  isIncome: boolean;

  @ApiProperty({ description: 'Date of the transaction' })
  date: Date;
}

export class BudgetDto {
  @ApiProperty({ description: 'Unique identifier for the budget' })
  id: string;

  @ApiProperty({ description: 'User ID that owns this budget' })
  userId: string;

  @ApiProperty({ description: 'Month number (1-12)', example: 3 })
  month: number;

  @ApiProperty({ description: 'Year', example: 2025 })
  year: number;

  @ApiProperty({ description: 'Total income amount', example: 30000 })
  income: number;

  @ApiProperty({ description: 'Total expenses amount', example: 20000 })
  expenses: number;

  @ApiProperty({ description: 'Array of budget items', type: [BudgetItemDto] })
  items: BudgetItemDto[];
}

export class BudgetSummaryDto {
  @ApiProperty({ description: 'Total income amount', example: 30000 })
  totalIncome: number;

  @ApiProperty({ description: 'Total expenses amount', example: 20000 })
  totalExpenses: number;

  @ApiProperty({ description: 'Budget balance (income - expenses)', example: 10000 })
  balance: number;

  @ApiProperty({ 
    description: 'Expenses grouped by category',
    example: {
      'Housing': 10000,
      'Food': 5000,
      'Transportation': 2000
    }
  })
  expensesByCategory: Record<string, number>;
}

// Keep the interfaces for backward compatibility
export interface BudgetItem extends BudgetItemDto {}
export interface Budget extends BudgetDto {}
export interface BudgetSummary extends BudgetSummaryDto {}