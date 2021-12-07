import { Query, Resolver } from "@nestjs/graphql";
import { User } from "@nx-nestjs-microservices/entities";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }
    
    @Query(() => [User], { name: 'users'})
    async users(): Promise<User[]> {
        console.log('link >>>', process.env.RABBITMQ_URI)
        return await this.userService.users();
    }
};
