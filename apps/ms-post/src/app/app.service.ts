import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from '@nx-nestjs-microservices/dto';
import { Post } from '@nx-nestjs-microservices/entities';
import { Repository } from 'typeorm';

const logger = new Logger('MS-User-Service');

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(payload: CreatePostInput): Promise<Post> {
    logger.log('Fulfilling createPost request back to queue');
    const newPost = this.postRepository.create(payload);
    newPost.createdAt = new Date();
    return await this.postRepository.save(newPost);
  }

  async findAllPosts(): Promise<Post[]> {
    logger.log('Fulfilling findAllPosts request back to queue');
    return await this.postRepository.find({});
  }

}
