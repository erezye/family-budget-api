"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetModel = exports.BudgetSchema = void 0;
const mongoose_1 = require("mongoose");
const budgetItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    isIncome: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, { _id: true });
exports.BudgetSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    income: { type: Number, default: 30000 },
    expenses: { type: Number, default: 0 },
    items: [budgetItemSchema]
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
exports.BudgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });
exports.BudgetModel = (0, mongoose_1.model)('Budget', exports.BudgetSchema);
//# sourceMappingURL=budget.model.js.map