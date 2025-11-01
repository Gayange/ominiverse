import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap the NestJS application
 * Configures global validation, CORS, API prefix, and Swagger documentation
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation pipe to enforce DTO rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Strip any properties not in the DTO
      forbidNonWhitelisted: true,   // Throw an error if unknown properties are sent
      transform: true,              // Automatically transform payloads to DTO instances
    }),
  );

  // ✅ Global API prefix
  app.setGlobalPrefix('api/v1');

  // ✅ Enable CORS for all origins (adjust in production as needed)
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ✅ Configure Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Intern Assessment API')
    .setDescription('API documentation for NestJS + Prisma project')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token (without Bearer prefix)',
        in: 'header',
      },
      'access-token', // Security scheme name used in Swagger
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keep JWT token after page reload
    },
  });

  // ✅ Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
