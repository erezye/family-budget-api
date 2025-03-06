import { Model } from 'mongoose';
import { User } from '../types';
export declare class UserController {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(user: User): Promise<User>;
    update(id: string, user: User): Promise<User>;
    remove(id: string): Promise<User>;
}
