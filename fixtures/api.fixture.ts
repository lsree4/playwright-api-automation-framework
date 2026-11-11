import { test as base } from '@playwright/test';
import { PostApi } from '../api/postsapi';
import { CommentsApi } from '../api/commentsapi';

type APIfixture = {
    postAPI : PostApi;
    commentsApi : CommentsApi
};
export const test = base.extend<APIfixture>({
    postAPI : async({request} , use) => {
        const postAPI = new PostApi(request);
        await use(postAPI);
    },
    commentsApi : async ({request} , use) =>{
        const commentsapi = new CommentsApi(request);
        await use(commentsapi);

    }
});
