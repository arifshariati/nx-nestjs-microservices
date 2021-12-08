import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SignupInput } from "@nx-nestjs-microservices/dto";
import { User } from "@nx-nestjs-microservices/entities";
import { Observable } from "rxjs";

export class UserService {

    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    users(): Observable<User[]> {
        return this.userClient.send('getAllUsers', {});
    }

    signup(signupInput: SignupInput): Observable<User> {
        return this.userClient.send('signupUser', signupInput);
    }

};