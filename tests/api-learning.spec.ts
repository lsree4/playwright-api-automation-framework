import { test , expect, request } from '@playwright/test';
test('Scenario 1 First API test' , async({request}) =>{
    const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const postdata = await response.json();
    console.log(postdata);
    expect(postdata.id).toBe(1);
    expect(postdata.title).toBe(
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    );
});
test('Scenario 2 -Get Multiple Posts' , async({request}) =>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    expect(response.status()).toBe(200);
    const posts = await response.json();
    console.log(posts);
    expect(posts).toHaveLength(100);
    expect(posts[0].id).toBe(1);
    expect(posts[99].id).toBe(100);
});
test('Scenario 3 - Create a post using POST request' , async({request}) =>{
    const response = await request.post('https://jsonplaceholder.typicode.com/posts',{
        data : {
            title : 'Playwright API test' ,
            body : 'Learnin post request' ,
            userId : 1
        }

    });
    expect(response.status()).toBe(201);
    console.log('HTTP Status', response.status());
    const postdata = await response.json();
    console.log(postdata);
    expect(postdata.title).toBe('Playwright API test');
    expect(postdata.body).toBe('Learnin post request');
    expect(postdata.id).toBe(101);


});

test('Scenario 4 Update a post using PUT', async({request})=>{
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data : {
                id: 1,
            title: 'Updated Playwright API Test',
            body: 'Learning PUT requests',
            userId: 1
            }
        }
    );
    expect(response.status()).toBe(200);
    const updateresponse = await response.json();
    console.log(updateresponse);
    expect(updateresponse.title).toBe('Updated Playwright API Test');
    expect(updateresponse.body).toBe('Learning PUT requests');
    expect(updateresponse.id).toBe(1);
});
test('Scenario 5 Partial update using Patch' , async({request}) => {
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data : {
                title: 'Updated Title using PATCH'
            }

        }
        

        
    );
    expect(response.status()).toBe(200);
    const patchpost = await response.json();
    console.log(patchpost);
    expect(patchpost.title).toBe('Updated Title using PATCH');
    expect(patchpost.body).toContain('quia et suscipit');
});

test('Scenario 6 -Delete a post' , async({request})=>{
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
});

test('Scenario 7- Verify 404 response', async({request})=>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/invalid-endpoint-for-testing'
    );
    expect(response.status()).toBe(404);
});

test('Scenario 8 - Filter the post by userid', async({request}) =>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
            params : {
                userId : 1
            }
        }
    );
    console.log('Response url :', response.url());
    expect(response.status()).toBe(200);
    const posts = await response.json();
    console.log(posts);
    console.log('Number of posts :', posts.length);
    expect(posts).toHaveLength(10);
    for (const post of posts) {
    expect(post.userId).toBe(1);
}
});

test('Scenario 9 - Verify response Header' , async({request}) =>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    console.log('Response Header', response.headers());
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.status()).toBe(200);
});

test('Scenario 10 - Send Customer request Header', async({request}) =>{
    const response = await request.get('https://httpbin.org/anything',{
        headers : {
            'X-Test-Client': 'PlaywrightLearning'
        }
    }

    );
    const postresponse = await response.json();
    console.log('HTTP Status ' , response.status());
    console.log('Echoed response header' , postresponse.headers);
});

test('Scenario 11 - API Authentication', async ({ request }) => {
    const response = await request.get('https://httpbin.org/bearer', {
    headers: {
        Authorization: 'Bearer playwright-learning-token'
    }
});
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    console.log(responseData);
    expect(responseData.authenticated).toBe(true);

});

test('Scenario 12 - Request Without Bearer Token', async ({ request }) => {
    const response = await request.get('https://httpbin.org/bearer');
    expect(response.status()).toBe(401);

});
test('Scenario 13 - Wrong authentication', async({request})=>{
    const response = await request.get('https://httpbin.org/bearer', {
        headers: {
            Authorization: 'Basic dXNlcjpwYXNzd29yZA=='
        }
    });
    expect(response.status()).toBe(401);
});
test('Scenario 14 - Validate response structure' , async({request}) =>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response.status()).toBe(200);
    const postresponse = await response.json();
    expect(postresponse).toHaveProperty('userId');
    expect(postresponse).toHaveProperty('id');
    expect(postresponse).toHaveProperty('title');
    expect(postresponse).toHaveProperty('body');
    expect(typeof postresponse.id).toBe('number');
    expect(typeof postresponse.title).toBe('string');
    expect(typeof postresponse.body).toBe('string')
});

test('Scenario 15 -Validate Multiple Response properties' , async({request})=>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response.status()).toBe(200);
    const postdata = await response.json();
    expect(postdata).toMatchObject({
        id: 1,
    userId: 1
    });
});
test('Scenario 16 - Validate array of objects', async({request})=>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts).toHaveLength(100);
    for(const post of posts){
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
        expect(typeof post.id).toBe('number');
        expect(typeof post.id).toBe('number');
        expect(typeof post.title).toBe('string');
        expect(typeof post.id).toBe('number');
        


    }
});

test('Scenario 17 - Validate Specific Object Values', async({request}) =>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1');
        expect(response.status()).toBe(200);
        const postdata = await response.json();
        expect(postdata.id).toBe(1);
        expect(postdata.userId).toBe(1);
        expect(postdata.title).toBe(
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
        );
        expect(postdata.body).toContain('quia et suscipit');

})
test('Scenario 18 API CHaining', async({request}) =>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const postdata = await response.json();
    const userId = postdata.userId;
    const userResponse = await request.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    expect(userResponse.status()).toBe(200);
    const userData = await userResponse.json();
    expect(userData.id).toBe(userId);
    expect(userData.name).toBe('Leanne Graham');
    expect(userData.email).toBe('Sincere@april.biz');
    expect(userData.address.city).toBe('Gwenborough');
    expect(userData.company.name).toBe('Romaguera-Crona');
}) ;

test('Scenario 19 - Validating Nonexistent user', async({request})=>{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/999'
    );
    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
    const errordata = await response.json();
    console.log(errordata);
    expect(errordata).toEqual({});
});

test('Scenario 20 - Validate API responsetime', async({request}) =>{
    const StartTime = Date.now();
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response.status()).toBe(200);
    const endtime = Date.now();
    const responsetime = endtime - StartTime;
    console.log(`API Response time : ${responsetime} ms`);
    expect(responsetime).toBeLessThan(5000);
});

test('Scenario 21 - Validate Query parameter', async({request}) =>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts',{
        params : {
            _limit : 5
        }
    }

    );
    const posts = await response.json();
    expect(posts).toHaveLength(5);
    expect(posts[4].id).toBe(5);

});

test('Scenario 22 - Validate Related Resources', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/comments',{
        params : {
            postId : 1
        }
    });
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
})