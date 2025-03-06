import { Controller, Get, Post, Body, Param, Put, Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDto } from '../types';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Injectable()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Returns a list of all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserDto] })
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Returns a single user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The found user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user', description: 'Creates a new user account' })
  @ApiBody({ type: UserDto, description: 'User data' })
  @ApiResponse({ status: 201, description: 'The created user', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  async create(@Body() user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user', description: 'Updates an existing user with new values' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UserDto, description: 'Updated user data' })
  @ApiResponse({ status: 200, description: 'The updated user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() user: User
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).lean();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user', description: 'Deletes a user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The deleted user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).lean();
  }
}