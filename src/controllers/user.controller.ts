import { Controller, Get, Post, Body, Param, Put, Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: User
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).lean();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).lean();
  }
}