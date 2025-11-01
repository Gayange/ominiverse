import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../../common/decorators/match.decorator'; // optional if confirmPassword used

export class RegisterDto {
  @Transform(({ value }) => value?.trim())
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email must be a string' })
  @MaxLength(100, { message: 'email must not exceed 100 characters' })
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(50, { message: 'password must not exceed 50 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  // Optional confirm password check
  @IsOptional()
  @IsString({ message: 'confirm password must be a string' })
  @Match('password', { message: 'passwords do not match' })
  confirmPassword?: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString({ message: 'name must be a string' })
  @MinLength(2, { message: 'name must be at least 2 characters' })
  @MaxLength(50, { message: 'name must be at most 50 characters' })
  @Matches(/^[\p{L} '-]+$/u, {
    message: 'name contains invalid characters',
  })
  name?: string;
}
