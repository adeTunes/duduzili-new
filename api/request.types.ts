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
  repost_time: Date;
  user: PostUser;
  parent: null;
  topic: string;
  date: string;
  post_url: string;
  youtube_url: string;
  reposter: {
    bio: string;
    country: string;
    email: string;
    first_name: string;
    get_cover_image: string;
    id: number;
    is_following: false;
    is_online: true;
    is_private: false;
    last_name: string;
    password: string;
    photo_url: string;
    town: string;
    username: string;
  };
  is_repost: boolean;
  media: {
    photo: string[];
    video: string;
    audio: string;
  };
  link_url: string;
  text: string;
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
  id: number
}[];

export type CommunityListData = {
  count: number;
  next: null | string;
  previous: null | string;
  results: CommunityList;
};

export type CommunityList = Community[];

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
  is_joined: boolean
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
  photo_url: string;
  town: null;
  username: string;
}




export interface RandomPostType {
  community: RandomCommunity;
  post:      RandomPost;
}

export interface RandomCommunity {
  code:          string;
  referral_code: string;
  name:          string;
  description:   string;
  owner:         Owner;
  total_members: number;
  created:       Date;
  updated:       Date;
  is_approved:   boolean;
  is_private:    boolean;
  category:      Category[];
  status:        string;
  get_logo_url:  string;
  members_photo: string[];
}

export interface Category {
  id:          number;
  name:        string;
  description: string;
  logo:        null;
}

export interface Owner {
  id:              number;
  username:        string;
  password:        string;
  email:           string;
  first_name:      string;
  last_name:       string;
  photo_url:       string;
  get_cover_image: string;
  is_online:       boolean;
  bio:             string;
  town:            null;
  country:         null;
  is_private:      boolean;
  is_following:    boolean;
}

export interface RandomPost {
  id:               number;
  total_likes:      number;
  total_comments:   number;
  total_reposts:    number;
  i_like_this_post: boolean;
  user:             Owner;
  parent:           null;
  topic:            null;
  date:             string;
  reposter:         null;
  youtube_url:      string;
  link_url:         string;
  text:             string;
  media:            Media;
  is_article:       boolean;
  date_added:       Date;
  last_modified:    Date;
  published:        boolean;
  title:            string;
  stickers:         RandomPostMedia;
  is_repost:        boolean;
  repost_time:      null;
}

export interface RandomPostMedia {
}


export interface CommunityDetails {
  responseCode: string;
  data:         Data;
  message:      string;
}

export interface Data {
  code:          string;
  referral_code: string;
  name:          string;
  description:   string;
  owner:         Owner;
  created:       Date;
  updated:       Date;
  is_approved:   boolean;
  is_private:    boolean;
  category:      Category[];
  status:        string;
  get_logo_url:  string;
  members_photo: string[];
  is_owner:      boolean;
  date_joined:   Date | string;
  total_members: string
  is_joined: boolean 

}

export interface Category {
  id:          number;
  name:        string;
  description: string;
  logo:        null;
}

export interface Owner {
  id:              number;
  username:        string;
  password:        string;
  email:           string;
  first_name:      string;
  last_name:       string;
  photo_url:       string;
  get_cover_image: string;
  is_online:       boolean;
  bio:             string;
  town:            null;
  country:         null;
  is_private:      boolean;
  is_following:    boolean;
}

export interface CommunityPostData {
  success:     boolean;
  status_code: number;
  data:        Data;
  message:     string;
}

export interface Data {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  community: Community;
  post:      Post;
}

export interface Owner {
  id:              number;
  username:        string;
  password:        string;
  email:           string;
  first_name:      string;
  last_name:       string;
  photo_url:       null | string;
  get_cover_image: string;
  is_online:       boolean;
  bio:             string;
  town:            null;
  country:         null;
  is_private:      boolean;
  is_following:    boolean;
}
