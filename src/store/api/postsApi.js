import axiosClient from "./axiosClient";
const postsApi = {
  getPosts: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getApi: (params) => {
    const url = "/api";
    return axiosClient.get(url, { params });
  },
  createNewPost: (params) => {
    const url = "/posts/create";
    return axiosClient.post(url, params);
  },
  deletePost: (params) => {
    const url = "/posts/delete";
    return axiosClient.post(url, params);
  },
  // get post data to view
  getPostData: (postId) => {
    const url = `/post/${postId}`;
    return axiosClient.get(url);
  },
  sendComment: (postId, params) => {
    const url = `/post/${postId}/cmt`;
    return axiosClient.post(url, params);
  },
  sendReaction: (postId, params) => {
    const url = `/post/${postId}/react`;
    return axiosClient.post(url, params);
    //   {
    //     "type": "react",
    //     "action": "like" / unlike
    //  }
  },
};

export default postsApi;
