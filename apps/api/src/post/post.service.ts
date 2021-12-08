import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreatePostInput } from "@nx-nestjs-microservices/dto";
import { Post } from "@nx-nestjs-microservices/entities";
import { Observable } from "rxjs";

export class PostService {

    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    ) { }

    createPost(createPostInput: CreatePostInput): Observable<Post> {
        return this.postClient.send('createPost', createPostInput);
    }

    posts(): Observable<Post[]> {
        return this.postClient.send('getAllPosts', {});
    }

}