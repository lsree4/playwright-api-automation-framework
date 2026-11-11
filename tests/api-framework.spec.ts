import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { newpostdata , UpdatedPostData ,patchedPostData } from '../Data/post.data';
import { json } from 'node:stream/consumers';
import { CommentsApi } from '../api/commentsapi';
test('API Framework - Get by Post Id', async({postAPI}) =>{
    
    const response = await postAPI.getPostbyID(1);
    expect(response.status()).toBe(200);
    const postdata = await response.json();
    expect(postdata.id).toBe(1);
});

test('API Framework - Get all Posts', async({postAPI}) =>{
    
    const response = await postAPI.getPosts();
    expect(response.status()).toBe(200);
    const postdata = await response.json();
    expect(postdata).toHaveLength(100);
    expect(postdata[0].id).toBe(1);
   
});
test('API Framework - Create a Post', async({postAPI}) =>{
    
    const response = await postAPI.createPost(newpostdata);
    expect(response.status()).toBe(201);
    const createdpost = await response.json();
    expect(createdpost.title).toBe('Playwright API Framework');
    expect(createdpost.body).toBe('Testing reusable POST method');
    expect(createdpost.userId).toBe(1);
    expect(createdpost.id).toBe(101);
});

test('API Framework - Update a post', async({postAPI}) =>{
    
    const response = await postAPI.UpdatePost(1,UpdatedPostData);
    expect(response.status()).toBe(200);
    const updatedpost = await response.json();
    expect(updatedpost.title).toBe('Updated Playwright Framework Post');
    expect(updatedpost.body).toBe('Testing reusable PUT method');
    expect(updatedpost.userId).toBe(1);
});

test('API Framework - PatchPost', async({postAPI}) =>{
    
    const response = await postAPI.PatchPost(1,patchedPostData);
    expect(response.status()).toBe(200);
    const updatedpatch = await response.json();
    expect(updatedpatch.title).toBe('Updated Title using Patch');
});

test('API Framework - DeletePOst' , async({postAPI}) =>{
    
    const response = await postAPI.DeletePost(1);
    expect(response.status()).toBe(200);
});

test('API Framework - Environment Configuration' , async({request}) =>{
    expect(process.env.API_BASE_URL).toBe('https://jsonplaceholder.typicode.com');
});

test('API Framework - Get Comments by Post ID' , async ({commentsApi}) =>{
    const response = await commentsApi.getCommentsByPostId(1);
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(comments).toHaveLength(5); 
    for(const comment of comments){
        expect(comment.postId).toBe(1);
        expect(comment).toHaveProperty('id');
        expect(comment).toHaveProperty('name');
        expect(comment).toHaveProperty('email');
        expect(comment).toHaveProperty('body');
        expect(typeof comment.id).toBe('number');
        expect(typeof comment.name).toBe('string');
        expect(typeof comment.email).toBe('string');
        expect(typeof comment.body).toBe('string');
        expect(comment.email).toContain('@');
    }
});

test('API Framework - Get Comments by ID' , async({commentsApi}) =>{
    const response = await commentsApi.getCommentById(1);
    expect(response.status()).toBe(200);
    const commentData = await response.json();
    expect(commentData.id).toBe(1);
    expect(commentData.postId).toBe(1);
    expect(commentData.name).toBe('id labore ex et quam laborum');
    expect(commentData.email).toBe('Eliseo@gardner.biz');
    
    expect(commentData.body).toContain('laudantium enim quasi est quidem magnam voluptate ipsam eos');

});

test('API Framework - Get Nonexistent Comment', async ({ commentsApi }) => {
    const response = await commentsApi.getCommentById(9999);
    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
    const errorData = await response.json();
    
    expect(errorData).toEqual({});
});