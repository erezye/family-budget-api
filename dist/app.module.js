"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const controllers_1 = require("./controllers");
const budget_model_1 = require("./models/budget.model");
const user_model_1 = require("./models/user.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/family-budget',
                    connectionFactory: (connection) => {
                        connection.on('connected', () => {
                            console.log('MongoDB connected successfully');
                        });
                        connection.on('error', (error) => {
                            console.error('MongoDB connection error:', error);
                        });
                        return connection;
                    },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Budget', schema: budget_model_1.BudgetSchema },
                { name: 'User', schema: user_model_1.UserSchema },
            ]),
        ],
        controllers: [
            controllers_1.BudgetController,
            controllers_1.UserController
        ],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map