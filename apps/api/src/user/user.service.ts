import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { User } from "@nx-nestjs-microservices/entities";

export class UserService {

    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    async users(): Promise<User[]> {
        return await this.userClient.send('getAllUsers',{}).toPromise();
    }

};