import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Registers a new user.
   * @param email - User's email
   * @param password - User's password
   * @param name - Optional user name
   * @returns JWT access token
   * @throws BadRequestException if email already exists or password is invalid
   */
  async register(email: string, password: string, name?: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException(`The email "${email}" is already registered.`);
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long.');
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return this.generateToken(user.id, user.email);
  }

  /**
   * Authenticates a user.
   * @param email - User's email
   * @param password - User's password
   * @returns JWT access token
   * @throws NotFoundException if user is not found
   * @throws UnauthorizedException if password is incorrect
   */
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`No account found with email "${email}".`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password. Please try again.');
    }

    return this.generateToken(user.id, user.email);
  }

  /**
   * Generates JWT access token.
   * @param userId - User ID
   * @param email - User email
   * @returns Object containing accessToken
   */
  private generateToken(userId: string, email: string) {
    const accessToken = this.jwt.sign({ sub: userId, email });
    return { accessToken };
  }
}
