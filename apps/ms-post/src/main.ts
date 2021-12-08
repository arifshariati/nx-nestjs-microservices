import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {

  const logger = new Logger('MS-Post');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@127.0.0.1:5672/vhost'],
      queue: 'posts',
      queueOptios: {
        durable: true
      }
    }
  });

  app.listen();
  logger.log(`🚀 MS-Post is up and running ...`);

}

bootstrap();
