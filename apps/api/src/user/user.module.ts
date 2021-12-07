import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'users',
          queueOptions: {
            durable: true
          }
        }
      }]),
  ],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UserModule {}
