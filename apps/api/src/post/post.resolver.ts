import { Query, Resolver } from "@nestjs/graphql";
import { Post } from "@nx-nestjs-microservices/entities";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {

    constructor(private readonly postService: PostService){}

    @Query(() => [Post], { name: 'posts'})
    async users(): Promise<Post[]> {
        return await this.postService.posts();
    }
};