import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
class SignupInput {

    @IsString()
    @Field()
    firstName: string;

    @IsString()
    @Field()
    lastName: string;

    @IsEmail()
    @Field()
    email: string;

    @Field()
    password: string;

}

export default SignupInput;