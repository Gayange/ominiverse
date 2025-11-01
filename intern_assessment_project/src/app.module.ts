import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { HealthController } from './health.controller';

/**
 * Root application module.
 * 
 * Imports:
 * - ConfigModule: Global configuration management
 * - AuthModule: Authentication features
 * - TodosModule: Todo CRUD functionality
 * 
 * Controllers:
 * - HealthController: Health check endpoint
 * 
 * Providers:
 * - PrismaService: Prisma ORM database service
 */
@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // Feature modules
    AuthModule,
    TodosModule,
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
