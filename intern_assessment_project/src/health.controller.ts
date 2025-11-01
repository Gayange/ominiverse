import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';

/**
 * HealthController
 * 
 * Provides a health check endpoint to verify API and database connectivity.
 */
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * GET /health
   * 
   * Returns API health status including database connection status.
   * 
   * @returns {Object} Health status with timestamp and database connection info
   */
  @Get()
  async check() {
    let dbStatus = 'disconnected';
    try {
      // Simple query to check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch {
      dbStatus = 'disconnected';
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      message: dbStatus === 'connected' ? 'API and database are healthy' : 'Database connection failed',
    };
  }
}
