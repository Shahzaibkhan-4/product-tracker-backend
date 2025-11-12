import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors();
  
  // Change port to 3001
  await app.listen(3001);
  console.log('🚀 Backend server running on http://localhost:3001');
}
bootstrap();