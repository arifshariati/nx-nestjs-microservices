import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePostInput } from '@nx-nestjs-microservices/dto';
import { Post } from '@nx-nestjs-microservices/entities';

const logger = new Logger('MS-User-Controller');

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    @MessagePattern('createPost')
    async createPost(@Payload() payload: CreatePostInput): Promise<Post> {
        logger.log('Picking createPost request from queue');
        return await this.appService.createPost(payload);
    }

    @MessagePattern('getAllPosts')
    async findAllUsers(@Payload() payload: {}): Promise<Post[]> {
        logger.log('Picking findAllPosts request from queue');
        return await this.appService.findAllPosts();
    }

}
