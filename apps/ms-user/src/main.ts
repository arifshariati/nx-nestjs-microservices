import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {

  const logger = new Logger('MS-User');
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672/vhost'],
      queue: 'users',
      queueOptios: {
        durable: true
      }
    }
  });

  app.listen();
  logger.log(`🚀 MS-User is up and running ...`);
}

bootstrap();
