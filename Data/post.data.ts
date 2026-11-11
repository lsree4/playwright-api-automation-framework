import { PostData } from "../api/post.types";
export const newpostdata : PostData = {
    title: 'Playwright API Framework',
    body: 'Testing reusable POST method',
    userId: 1
};
export const UpdatedPostData : PostData = {
    title :'Updated Playwright Framework Post',
    body: 'Testing reusable PUT method',
    userId: 1
};
export const patchedPostData : Partial<PostData> = {
    title : 'Updated Title using Patch'
};

