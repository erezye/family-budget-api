"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../types");
const swagger_1 = require("@nestjs/swagger");
let BudgetController = class BudgetController {
    constructor(budgetModel) {
        this.budgetModel = budgetModel;
    }
    async findAll() {
        return this.budgetModel.find().lean();
    }
    async findOne(id) {
        return this.budgetModel.findById(id).lean();
    }
    async getBudgetSummary(id) {
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
        }, {});
        return {
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            expensesByCategory
        };
    }
    async create(budget) {
        const newBudget = new this.budgetModel(budget);
        return newBudget.save();
    }
    async addBudgetItem(id, item) {
        const budget = await this.budgetModel.findById(id);
        budget.items.push(item);
        if (item.isIncome) {
            budget.income += item.amount;
        }
        else {
            budget.expenses += item.amount;
        }
        return budget.save();
    }
    async update(id, budget) {
        return this.budgetModel.findByIdAndUpdate(id, budget, { new: true }).lean();
    }
    async remove(id) {
        return this.budgetModel.findByIdAndDelete(id).lean();
    }
    async removeBudgetItem(budgetId, itemId) {
        const budget = await this.budgetModel.findById(budgetId);
        const itemIndex = budget.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            const item = budget.items[itemIndex];
            if (item.isIncome) {
                budget.income -= item.amount;
            }
            else {
                budget.expenses -= item.amount;
            }
            budget.items.splice(itemIndex, 1);
        }
        return budget.save();
    }
};
exports.BudgetController = BudgetController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all budgets', description: 'Returns a list of all available budgets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of budgets', type: [types_1.BudgetDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget by ID', description: 'Returns a single budget by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Budget ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The found budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('summary/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget summary', description: 'Returns a summary of income, expenses, and categories for a budget' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Budget ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Budget summary', type: types_1.BudgetSummaryDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "getBudgetSummary", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new budget', description: 'Creates a new monthly budget with initial values' }),
    (0, swagger_1.ApiBody)({ type: types_1.BudgetDto, description: 'Budget data' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The created budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid budget data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to budget', description: 'Adds a new transaction (income or expense) to a budget' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Budget ID' }),
    (0, swagger_1.ApiBody)({ type: types_1.BudgetItemDto, description: 'Budget item data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "addBudgetItem", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a budget', description: 'Updates an existing budget with new values' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Budget ID' }),
    (0, swagger_1.ApiBody)({ type: types_1.BudgetDto, description: 'Updated budget data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a budget', description: 'Deletes a budget and all its items' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Budget ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The deleted budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':budgetId/items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a budget item', description: 'Removes a transaction from a budget' }),
    (0, swagger_1.ApiParam)({ name: 'budgetId', description: 'Budget ID' }),
    (0, swagger_1.ApiParam)({ name: 'itemId', description: 'Budget item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated budget', type: types_1.BudgetDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Budget or item not found' }),
    __param(0, (0, common_1.Param)('budgetId')),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "removeBudgetItem", null);
exports.BudgetController = BudgetController = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)('budgets'),
    (0, common_1.Controller)('budgets'),
    __param(0, (0, mongoose_1.InjectModel)('Budget')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BudgetController);
//# sourceMappingURL=budget.controller.js.map