export declare class BudgetItemDto {
    id: string;
    name: string;
    amount: number;
    category: string;
    isIncome: boolean;
    date: Date;
}
export declare class BudgetDto {
    id: string;
    userId: string;
    month: number;
    year: number;
    income: number;
    expenses: number;
    items: BudgetItemDto[];
}
export declare class BudgetSummaryDto {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    expensesByCategory: Record<string, number>;
}
export interface BudgetItem extends BudgetItemDto {
}
export interface Budget extends BudgetDto {
}
export interface BudgetSummary extends BudgetSummaryDto {
}
