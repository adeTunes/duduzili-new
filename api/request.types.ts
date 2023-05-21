export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
};

export type verifyAccountType = {
  otp: "";
  email: string;
};

export type Post = {
  id: number;
  total_likes: number;
  total_comments: number;
  total_reposts: number;
  i_like_this_post: boolean;
  user: PostUser;
  parent: null;
  topic: string;
  date: string;
  photo_url: string;
  audio_url: string;
  video_url: string;
  post_url: string;
  youtube_url: string;
  link_url: string;
  text: string;
  photo: string;
  audio: string;
  video: string;
  is_article: boolean;
  date_added: Date;
  last_modified: Date;
  published: boolean;
  title: string;
};

export type Posts = {
  count: number;
  next: string | null;
  previous: null | string;
  results: Post[];
};

interface PostUser {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  is_online: boolean;
  bio: null;
  town: null;
  country: null;
  is_private: boolean;
  is_following: boolean;
}

export type SinglePost = {
  comments: [];
  post: Post;
};

export interface UserPosts {
  user: User;
  posts: Media;
  saveds: any[];
  drafts: any[];
  medias: Media;
  followings: number;
  followers: number;
  bio: null;
  town: string;
  country: string;
  is_me: boolean;
  i_am_following_this_user: boolean;
}

export type Media = MediaObject[];

export interface MediaObject {
  id: number;
  total_likes: number;
  total_comments: number;
  total_reposts: number;
  i_like_this_post: boolean;
  user: User;
  parent: null;
  topic: null;
  date: string;
  photo_url: null;
  audio_url: null;
  video_url: null;
  post_url: string;
  youtube_url: string;
  link_url: string;
  text: string;
  photo: null;
  audio: null;
  video: null;
  is_article: boolean;
  date_added: Date;
  last_modified: Date;
  published: boolean;
  title: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  is_online: boolean;
  bio: null;
  town: null;
  country: null;
  is_private: boolean;
  is_following: boolean;
}

export type FollowingsType = Following[];

export interface Following {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: null;
  is_online: boolean;
  bio: string;
  town: null;
  country: null;
  is_private: boolean;
  is_following: boolean;
}

export type CommunityCategoryType = {
  name: string;
  description: string;
}[];

export type CommunityListData = {
  count: number;
  next: null | string;
  previous: null | string;
  results: CommunityList;
};

export type CommunityList = Community[]

export type Community = {
  category: any[];
  code: string;
  created: Date;
  description: string;
  get_logo_url: string;
  is_approved: boolean;
  is_private: boolean;
  members_photo: any[];
  referral_code: string;
  status: string;
  total_members: number;
  updated: Date;
  name: string;
  owner: Owner;
};

export interface Owner {
  bio: string;
  country: null;
  email: string;
  first_name: string;
  get_cover_image: string;
  id: number;
  is_following: boolean;
  is_online: boolean;
  is_private: boolean;
  last_name: string;
  password: string;
  photo_url: null;
  town: null;
  username: string;
}
