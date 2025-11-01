import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully.');
    } catch (error) {
      this.logger.error('Failed to connect Prisma', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Prisma disconnected successfully.');
    } catch (error) {
      this.logger.error('Failed to disconnect Prisma', error);
      throw error;
    }
  }

  /**
   * Optional: enable graceful shutdown
   * Prisma 6+ doesn't support $on('beforeExit') in TypeScript directly
   */
  async enableShutdownHooks(app: any) {
    process.on('SIGINT', async () => {
      this.logger.log('SIGINT received. Disconnecting Prisma...');
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      this.logger.log('SIGTERM received. Disconnecting Prisma...');
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });
  }
}
