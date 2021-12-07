import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Post } from "@nx-nestjs-microservices/entities";

export class PostService {

    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    ) { }

    async posts(): Promise<Post[]> {
        return await this.postClient.send('getAllPosts',{}).toPromise();
    }
    
}