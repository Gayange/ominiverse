import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ValidationPipe, UsePipes } from '@nestjs/common';

/**
 * DTO for user registration
 */
export class RegisterDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsString({ message: 'Email must be a string' })
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password!: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  @Matches(/^[\p{L} '-]+$/u, { message: 'Name contains invalid characters' })
  name?: string;
}

/**
 * DTO for user login
 */
export class LoginDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsString({ message: 'Email must be a string' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /**
   * Register a new user
   */
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.auth.register(dto.email, dto.password, dto.name);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Login user
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() dto: LoginDto) {
    try {
      return await this.auth.login(dto.email, dto.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
