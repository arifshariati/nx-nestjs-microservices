import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@nx-nestjs-microservices/entities";
import { UserService } from "./user.service";
import { SignupInput } from '@nx-nestjs-microservices/dto';
import { map, Observable } from "rxjs";

@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    @Mutation(() => User, { name: 'signup' })
    signup(
        @Args('signupInput') signupInput: SignupInput
    ): Observable<User> {
        return this.userService.signup(signupInput).pipe(map((user: User) => user));
    }

    @Query(() => [User], { name: 'users' })
    users(): Observable<User[]> {
        return this.userService.users().pipe(map((users: User[]) => users));
    }
};
