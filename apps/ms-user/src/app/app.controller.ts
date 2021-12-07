import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";

const logger = new Logger('MS-User-Controller');

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    @MessagePattern('findAllUsers')
    async findAllUsers(@Payload() payload: {}) {
        logger.log('Picking findAllUsers request from queue');
        await this.appService.findAllUsers();
    }

}