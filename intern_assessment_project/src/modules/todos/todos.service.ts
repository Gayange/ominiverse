import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

/**
 * TodosService
 * 
 * Handles all business logic for managing todos:
 * - Create, update, delete, and fetch todos
 * - Supports filtering, sorting, and validation
 */
@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new todo
   * @param userId - ID of the user creating the todo
   * @param dto - CreateTodoDto containing title, description, and optional dueDate
   * @returns The created todo
   * @throws BadRequestException if title already exists or dueDate is invalid
   */
  async create(userId: string, dto: CreateTodoDto) {
    const existing = await this.prisma.todo.findFirst({
      where: { userId, title: dto.title },
    });
    if (existing) {
      throw new BadRequestException(`Todo with title "${dto.title}" already exists.`);
    }

    let dueDate: Date | null = null;
    if (dto.dueDate) {
      dueDate = new Date(dto.dueDate);
      if (isNaN(dueDate.getTime())) {
        throw new BadRequestException('Invalid dueDate. Must be a valid ISO date string.');
      }
    }

    return this.prisma.todo.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        dueDate,
      },
    });
  }

  /**
   * List todos with optional filters and sorting
   * @param userId - ID of the user
   * @param filters - Optional filters: status, title, from/to dates, sortBy, order
   * @returns Array of todos
   * @throws NotFoundException if no todos match the criteria
   */
  async list(
    userId: string,
    filters: {
      status?: string;
      title?: string;
      from?: string;
      to?: string;
      sortBy?: 'created' | 'dueDate' | 'title';
      order?: 'asc' | 'desc';
    },
  ) {
    const where: any = { userId };

    // Status filter
    if (filters.status === 'completed') where.completed = true;
    else if (filters.status === 'pending') where.completed = false;

    // Title filter (partial match)
    if (filters.title) {
      where.title = { contains: filters.title };
    }

    // Due date range filter
    if (filters.from || filters.to) {
      where.dueDate = {};
      if (filters.from) {
        const fromDate = new Date(filters.from);
        if (isNaN(fromDate.getTime())) throw new BadRequestException('Invalid "from" date.');
        where.dueDate.gte = fromDate;
      }
      if (filters.to) {
        const toDate = new Date(filters.to);
        if (isNaN(toDate.getTime())) throw new BadRequestException('Invalid "to" date.');
        where.dueDate.lte = toDate;
      }
    }

    // Sorting logic
    const fieldMap = {
      created: 'createdAt',
      dueDate: 'dueDate',
      title: 'title',
    };
    let orderBy: any = { createdAt: 'desc' }; // default

    if (filters.sortBy && fieldMap[filters.sortBy]) {
      orderBy = { [fieldMap[filters.sortBy]]: filters.order === 'desc' ? 'desc' : 'asc' };
    }

    const todos = await this.prisma.todo.findMany({ where, orderBy });

    if (!todos.length) {
      throw new NotFoundException('No todos found for the given criteria.');
    }

    return todos;
  }

  /**
   * Get a single todo by ID
   * @param userId - ID of the user
   * @param id - ID of the todo
   * @returns The todo
   * @throws NotFoundException if todo not found
   */
  async getOne(userId: string, id: string) {
    const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
    if (!todo) throw new NotFoundException(`Todo with ID "${id}" not found`);
    return todo;
  }

  /**
   * Update a todo
   * @param userId - ID of the user
   * @param id - ID of the todo
   * @param dto - UpdateTodoDto
   * @returns Updated todo
   * @throws BadRequestException for duplicate titles or invalid dates
   */
  async update(userId: string, id: string, dto: UpdateTodoDto) {
    const todo = await this.getOne(userId, id);

    // Check duplicate title
    if (dto.title && dto.title !== todo.title) {
      const duplicate = await this.prisma.todo.findFirst({ where: { userId, title: dto.title } });
      if (duplicate) throw new BadRequestException(`Another todo with title "${dto.title}" already exists.`);
    }

    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.completed !== undefined) data.completed = dto.completed;

    if (dto.dueDate !== undefined) {
      const dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
      if (dueDate && isNaN(dueDate.getTime())) {
        throw new BadRequestException('Invalid dueDate. Must be a valid ISO date string.');
      }
      data.dueDate = dueDate;
    }

    return this.prisma.todo.update({ where: { id }, data });
  }

  /**
   * Delete a todo
   * @param userId - ID of the user
   * @param id - ID of the todo
   * @returns The deleted todo
   */
  async delete(userId: string, id: string) {
    await this.getOne(userId, id);
    return this.prisma.todo.delete({ where: { id } });
  }
}
