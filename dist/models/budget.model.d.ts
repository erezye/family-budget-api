import { Schema } from 'mongoose';
import { Budget } from '../types';
export declare const BudgetSchema: Schema<Budget, import("mongoose").Model<Budget, any, any, any, import("mongoose").Document<unknown, any, Budget> & Budget & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Budget, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Budget>> & import("mongoose").FlatRecord<Budget> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const BudgetModel: import("mongoose").Model<Budget, {}, {}, {}, import("mongoose").Document<unknown, {}, Budget> & Budget & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
