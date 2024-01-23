import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
  });
}
bootstrap();
