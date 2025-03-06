import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'User password (hashed in storage)', example: 'password123' })
  password: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Monthly income in ILS', example: 30000 })
  monthlyIncome: number;
}

// Keep the interface for backward compatibility
export interface User extends UserDto {}