import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

async function bootstrap() {
  // Check if we're only generating Swagger
  const generateSwaggerOnly = process.argv.includes('--generate-swagger');
  
  // Enable mongoose debug mode to see queries
  mongoose.set('debug', true);
  
  const app = await NestFactory.create(AppModule);
  
  // Apply validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Enable CORS
  app.enableCors();
  
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Family Budget API')
    .setDescription('API for managing family budgets with income, expenses, and reporting')
    .setVersion('1.0')
    .addTag('budgets', 'Budget management endpoints')
    .addTag('users', 'User management endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Save swagger json file
  const outputPath = join(process.cwd(), 'swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
  console.log(`Swagger JSON file generated at ${outputPath}`);
  
  // If we're only generating Swagger, exit here
  if (generateSwaggerOnly) {
    console.log('Swagger generation complete. Exiting...');
    process.exit(0);
  }
  
  // Set up Swagger UI endpoint
  SwaggerModule.setup('api-docs', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
}

bootstrap();