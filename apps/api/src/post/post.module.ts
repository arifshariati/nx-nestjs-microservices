import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';


@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'posts',
          queueOptions: {
            durable: true
          }
        }
      }]),
  ],
  controllers: [],
  providers: [PostResolver,PostService],
})
export class PostModule {}
