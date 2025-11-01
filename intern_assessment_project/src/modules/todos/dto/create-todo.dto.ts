import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'title must be a string' })
  @MaxLength(100, { message: 'title must not exceed 100 characters' })
  title: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @MaxLength(500, { message: 'description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  dueDate?: string;
}
