import { APIRequestContext } from "@playwright/test";
import { PostData } from "./post.types";
export class PostApi{
    private readonly baseURL = 
    process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
    constructor (private readonly request : APIRequestContext){
    }
    async getPostbyID( postId : number){
        return this.request.get(`${this.baseURL}/posts/${postId}`);
    }
    async getPosts(){
        return this.request.get(`${this.baseURL}/posts`);
    
    }
    async createPost(postData : PostData){
        return this.request.post(`${this.baseURL}/posts`, {
            data : postData
        })
    }
    async UpdatePost(
        postId : number ,
        postdata : PostData
    ){
        return this.request.put(
            `${this.baseURL}/posts/${postId}`,
            {
                data : {
                    id : postId,
                    ...postdata
                }
            }
        )
    }
    async PatchPost(postId : number , postData : Partial<PostData>){
        return this.request.patch(
            `${this.baseURL}/posts/${postId}`,
            {
                data : postData
            }
        );
    }
    async DeletePost(postId : number){
        return this.request.delete(
            `${this.baseURL}/posts/${postId}`
        );
    }
};