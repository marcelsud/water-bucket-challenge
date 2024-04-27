import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
