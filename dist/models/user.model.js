"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    monthlyIncome: { type: Number, default: 30000 }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});
exports.UserModel = (0, mongoose_1.model)('User', exports.UserSchema);
//# sourceMappingURL=user.model.js.map