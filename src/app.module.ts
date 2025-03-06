import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BudgetController, UserController } from './controllers';
import { BudgetSchema } from './models/budget.model';
import { UserSchema } from './models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
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
    MongooseModule.forFeature([
      { name: 'Budget', schema: BudgetSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [
    BudgetController,
    UserController
  ],
  providers: [],
})
export class AppModule {}