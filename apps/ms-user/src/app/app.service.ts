import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@nx-nestjs-microservices/entities';
import { Repository } from 'typeorm';

const logger = new Logger('MS-User-Service');

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    logger.log('Fulfilling findAllUsers request back to queue');
    return await this.userRepository.find({});
  }
  
}
