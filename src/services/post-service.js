import { privateAxios } from "./helpers";
import { myAxios } from "./helpers";

export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then((response) => response.data);
}


export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);
}

// get post by id

export const loadPost = (postId) => {
    return myAxios.get(`/posts/${postId}`).then((response) => response.data);
}

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/post/image/upload/${postId}`, formData).then((resp) => resp.data);
}

export const loadPostUserData = (userId) => {
    return myAxios.get(`/user/${userId}/posts`).then((response) => response.data);
}

export const deletePostService = (postId) => {
    return privateAxios.delete(`/posts/${postId}`).then((response) => response.data);
}


export const createComment = (comment, postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment).then((resp) => resp.data);
}


export const deleteCommentService = (commentId) => {
    return myAxios.delete(`/comments/${commentId}`).then((response) => response.data);
};


export const updateCommentService = (comment, commentId) => {
    return myAxios.put(`/comments/${commentId}`, comment).then((response) => response.data);
};


export const loadPostsByCategory=(categoryId)=>{
    return myAxios.get(`/category/${categoryId}/posts`).then((res)=>res.data);
}

// update post 
export const updatePost=(postId,post)=>{
    return privateAxios.put(`/posts/${postId}`,post).then((resp)=>resp.data);
}