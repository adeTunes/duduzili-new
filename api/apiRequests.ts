import API from "./axiosConfig";
import {
  LoginUser,
  RegisterUser,
  verifyAccountType,
} from "./request.types";

// POST REQUESTS
export const loginUser = (data: LoginUser) => {
  return API.post("/api/v1/rest-auth/signin/", data);
};
export const registerUser = (data: RegisterUser) => {
  return API.post("/api/v1/rest-auth/signup/", data);
};
export const verifyAccount = (data: verifyAccountType) => {
  return API.post("/api/v1/rest-auth/verify_account/", data);
};

export const createPostRequest = (data) => {
  return API.post("/api/v1/rest-auth/posts/", data);
};

export const reportPost = (data) => {
  return API.post("/api/v1/rest-auth/report_post/", data);
};

export const blockUser = (data) => {
  return API.post(`/api/v1/rest-auth/block/`, data);
};

// PUT REQUESTS

export const editProfile = (id: string | number, data: any) => {
  return API.put(`/api/v1/rest-auth/user/${id}/`, data);
};

// GET REQUESTS
export const getUserDetails = (id) => {
  return API.get(`/api/v1/rest-auth/user/${id}/`);
};
export const getAllPosts = () => {
  return API.get("/api/v1/rest-auth/posts/");
};
export const getTrendingPosts = () => {
  return API.get("/api/v1/rest-auth/trending/");
};
export const getSinglePost = (id: number) => {
  return API.get(`/api/v1/rest-auth/posts/${id}/`);
};

export const getUserPosts = (id: number) => {
  return API.get(`/api/v1/rest-auth/user/${id}/`);
};
export const getUserFollowers = (id: number) => {
  return API.get(`/api/v1/rest-auth/user_followers/${id}/`);
};
export const getUserFollowings = (id: number) => {
  return API.get(`/api/v1/rest-auth/user_followings/${id}/`);
};

export const savePost = (id) => {
  return API.get(`/api/v1/rest-auth/save/${id}/`);
};
export const followUser = (id) => {
  return API.get(`/api/v1/rest-auth/follow/${id}/`);
};
export const muteUser = (id) => {
  return API.get(`/api/v1/rest-auth/mute/${id}/`);
};
export const unmuteUser = (id) => {
  return API.get(`/api/v1/rest-auth/unmute/${id}/`);
};
export const unblockUser = (id) => {
  return API.get(`/api/v1/rest-auth/unblock/${id}/`);
};
export const blockedUsersList = () => {
  return API.get("/api/v1/rest-auth/blocked_list/");
};
export const mutedUsersList = () => {
  return API.get("/api/v1/rest-auth/muted_list/");
};
export const followingUsersList = (id) => {
  return API.get(`/api/v1/rest-auth/user_followers/${id}/`);
};
export const followingersUsersList = (id) => {
  return API.get(`/api/v1/rest-auth/user_followings/${id}/`);
};
export const discoverPeopleList = () => {
  return API.get("/api/v1/rest-auth/discover_people/");
};
export const getUserPostWithUrl = (url) => {
  return API.get(url);
};

export const switchStatusOnline = () => {
  return API.get("/api/v1/rest-auth/change_status/yes/");
};
export const switchStatusOffline = () => {
  return API.get("/api/v1/rest-auth/change_status/No/");
};
