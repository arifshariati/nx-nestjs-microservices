import { SignupInput } from '@nx-nestjs-microservices/dto';
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { User } from '@nx-nestjs-microservices/entities';

const logger = new Logger('MS-User-Controller');

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    @MessagePattern('getAllUsers')
    async findAllUsers(@Payload() payload: any): Promise<User[]> {
        logger.log('Picking findAllUsers request from queue');
        return await this.appService.findAllUsers();
    }

    @MessagePattern('signupUser')
    async signupUser(@Payload() payload: SignupInput): Promise<User> {
        logger.log('Picking signupUser request from queue');
        return await this.appService.signupUser(payload);
    }

}