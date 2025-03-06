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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetSummaryDto = exports.BudgetDto = exports.BudgetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BudgetItemDto {
}
exports.BudgetItemDto = BudgetItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the budget item' }),
    __metadata("design:type", String)
], BudgetItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the budget item', example: 'Groceries' }),
    __metadata("design:type", String)
], BudgetItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount in ILS', example: 3000 }),
    __metadata("design:type", Number)
], BudgetItemDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category of the budget item', example: 'Food' }),
    __metadata("design:type", String)
], BudgetItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether this is income or expense', example: false }),
    __metadata("design:type", Boolean)
], BudgetItemDto.prototype, "isIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of the transaction' }),
    __metadata("design:type", Date)
], BudgetItemDto.prototype, "date", void 0);
class BudgetDto {
}
exports.BudgetDto = BudgetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the budget' }),
    __metadata("design:type", String)
], BudgetDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID that owns this budget' }),
    __metadata("design:type", String)
], BudgetDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Month number (1-12)', example: 3 }),
    __metadata("design:type", Number)
], BudgetDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Year', example: 2025 }),
    __metadata("design:type", Number)
], BudgetDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total income amount', example: 30000 }),
    __metadata("design:type", Number)
], BudgetDto.prototype, "income", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total expenses amount', example: 20000 }),
    __metadata("design:type", Number)
], BudgetDto.prototype, "expenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of budget items', type: [BudgetItemDto] }),
    __metadata("design:type", Array)
], BudgetDto.prototype, "items", void 0);
class BudgetSummaryDto {
}
exports.BudgetSummaryDto = BudgetSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total income amount', example: 30000 }),
    __metadata("design:type", Number)
], BudgetSummaryDto.prototype, "totalIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total expenses amount', example: 20000 }),
    __metadata("design:type", Number)
], BudgetSummaryDto.prototype, "totalExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Budget balance (income - expenses)', example: 10000 }),
    __metadata("design:type", Number)
], BudgetSummaryDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expenses grouped by category',
        example: {
            'Housing': 10000,
            'Food': 5000,
            'Transportation': 2000
        }
    }),
    __metadata("design:type", Object)
], BudgetSummaryDto.prototype, "expensesByCategory", void 0);
//# sourceMappingURL=budget.js.map