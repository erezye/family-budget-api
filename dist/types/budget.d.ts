export interface BudgetItem {
    id: string;
    name: string;
    amount: number;
    category: string;
    isIncome: boolean;
    date: Date;
}
export interface Budget {
    id: string;
    userId: string;
    month: number;
    year: number;
    income: number;
    expenses: number;
    items: BudgetItem[];
}
export interface BudgetSummary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    expensesByCategory: Record<string, number>;
}
