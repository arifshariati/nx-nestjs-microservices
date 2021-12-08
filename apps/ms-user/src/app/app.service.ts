import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from '@nx-nestjs-microservices/dto';
import { User } from '@nx-nestjs-microservices/entities';
import { Repository } from 'typeorm';

const logger = new Logger('MS-User-Service');

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async findAllUsers() {
    logger.log('Fulfilling findAllUsers request back to queue');
    return await this.userRepository.find({});
  }

  async signupUser(payload: SignupInput): Promise<User> {
    logger.log('Fulfilling signupUser request back to queue');
    const existingUser = await this.getUserByEmail(payload.email);
    if (existingUser) {
      throw new HttpException('User Already exists.', HttpStatus.BAD_REQUEST);

    } else {
      const newUser = this.userRepository.create(payload);
      newUser.createdAt = new Date();
      return this.userRepository.save(newUser);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  };

}
