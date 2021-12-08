import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
class CreatePostInput {

    @IsString()
    @Field()
    title: string;

    @IsString()
    @Field()
    body: string;


}

export default CreatePostInput;