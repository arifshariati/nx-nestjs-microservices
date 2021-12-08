import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
@ObjectType()
class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    body: string;

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}

export default Post;