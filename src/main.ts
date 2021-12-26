import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// starting up the app
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // pass own App and node module in NestFactory
  await app.listen(3000);
}
bootstrap();
