import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
dotenv.config();

async function bootstrap() {
  console.log(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:8000',
      'http://localhost:3000',
      'http://localhost:8080',
    ],
    credentials: true,
  });
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);
}

bootstrap()
  .then(() => console.log('app running on port 8080'))
  .catch((error) => console.log(error));
