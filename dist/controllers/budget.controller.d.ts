import { Model } from 'mongoose';
import { Budget, BudgetItem, BudgetSummary } from '../types';
export declare class BudgetController {
    private readonly budgetModel;
    constructor(budgetModel: Model<Budget>);
    findAll(): Promise<Budget[]>;
    findOne(id: string): Promise<Budget>;
    getBudgetSummary(id: string): Promise<BudgetSummary>;
    create(budget: Budget): Promise<Budget>;
    addBudgetItem(id: string, item: BudgetItem): Promise<Budget>;
    update(id: string, budget: Budget): Promise<Budget>;
    remove(id: string): Promise<Budget>;
    removeBudgetItem(budgetId: string, itemId: string): Promise<Budget>;
}
