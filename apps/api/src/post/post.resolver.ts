import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePostInput } from "@nx-nestjs-microservices/dto";
import { Post } from "@nx-nestjs-microservices/entities";
import { map, Observable } from "rxjs";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {

    constructor(private readonly postService: PostService) { }

    @Mutation(() => Post, { name: 'createpost' })
    createPost(
        @Args('createPostInput') createPostInput: CreatePostInput
    ): Observable<Post> {
        return this.postService.createPost(createPostInput).pipe(map((post: Post) => post));
    }

    @Query(() => [Post], { name: 'posts' })
    posts(): Observable<Post[]> {
        return this.postService.posts().pipe(map((posts: Post[]) => posts));
    }
};