import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post.entity';

@Entity()
@ObjectType()
class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @OneToMany(() => Post, post => post.user)
    @Field(() => [Post], { nullable: true })
    posts?: Post[];

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}

export default User;
