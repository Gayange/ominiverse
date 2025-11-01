import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from '../../common/prisma.service';
import { AuthModule } from '../auth/auth.module';

/**
 * TodosModule
 * 
 * This module handles all Todo-related functionality.
 * It imports the AuthModule for JWT authentication and provides
 * the TodosService for business logic.
 * PrismaService is injected for database operations.
 */
@Module({
  imports: [AuthModule], // Import AuthModule to use JWT guard
  controllers: [TodosController], // Controller to handle HTTP requests
  providers: [TodosService, PrismaService], // Services for business logic and DB access
  exports: [TodosService], // Export service if needed by other modules
})
export class TodosModule {}
