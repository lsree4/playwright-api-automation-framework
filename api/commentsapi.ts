import { APIRequestContext } from "@playwright/test";
export class CommentsApi{
    private readonly baseURL =
        process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
    constructor(private readonly request : APIRequestContext){
    }
        async getCommentsByPostId( postId : number){
            return this.request.get(`${this.baseURL}/comments`, {
                params :{
                    postId : postId
                }
            })
        }
        async getCommentById(commentId: number) {
            return this.request.get(`${this.baseURL}/comments/${commentId}`);
}

    
}
