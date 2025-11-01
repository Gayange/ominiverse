import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('todos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todos: TodosService) {}

  /**
   * Create a new Todo
   */
  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo successfully created' })
  async create(@Req() req: any, @Body() dto: CreateTodoDto) {
    const todo = await this.todos.create(req.user.sub, dto);
    return {
      message: 'Todo successfully created',
      data: todo,
    };
  }

  /**
   * List Todos with optional filters and sorting
   */
  @ApiQuery({ name: 'status', required: false, enum: ['completed', 'pending'] })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['created', 'dueDate', 'title'] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @Get()
  @ApiOperation({ summary: 'Get list of todos with optional filters and sorting' })
  @ApiResponse({ status: 200, description: 'Returns list of todos' })
  async list(
    @Req() req: any,
    @Query('status') status?: string,
    @Query('title') title?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('sortBy') sortBy?: 'created' | 'dueDate' | 'title',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    const todos = await this.todos.list(req.user.sub, { status, title, from, to, sortBy, order });
    return {
      message: 'Todos retrieved successfully',
      data: todos,
    };
  }

  /**
   * Get a single Todo by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single todo by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single todo' })
  async getOne(@Req() req: any, @Param('id') id: string) {
    const todo = await this.todos.getOne(req.user.sub, id);
    return {
      message: 'Todo retrieved successfully',
      data: todo,
    };
  }

  /**
   * Update a Todo by ID
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo successfully updated' })
  async update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const updated = await this.todos.update(req.user.sub, id, dto);
    return {
      message: 'Todo successfully updated',
      data: updated,
    };
  }

  /**
   * Delete a Todo by ID
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo successfully deleted' })
  async delete(@Req() req: any, @Param('id') id: string) {
    await this.todos.delete(req.user.sub, id);
    return {
      message: 'Todo successfully deleted',
    };
  }
}
