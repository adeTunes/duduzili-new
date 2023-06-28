import API, { PAYMENTAPI } from "./axiosConfig";
import { LoginUser, RegisterUser, verifyAccountType } from "./request.types";

// POST REQUESTS
export const loginUser = (data: LoginUser) => {
  return API.post("/api/v1/rest-auth/signin/", data);
};
export const resetPassword = (data: LoginUser) => {
  return API.post("/api/v1/rest-auth/password_reset/", data);
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
export const reportUser = (data) => {
  return API.post("/api/v1/rest-auth/report_user/", data);
};

export const blockUser = (data) => {
  return API.post(`/api/v1/rest-auth/block/`, data);
};
export const postAComment = (data) => {
  return API.post(`/api/v1/rest-auth/comment/`, data);
};
export const connectAccount = (data) => {
  return API.post("/api/v1/rest-auth/add_account/", data);
};
export const repostPost = (data) => {
  return API.post(`/api/v1/rest-auth/repost/`, data);
};
export const sendOTP = (data) => {
  return API.post(`/api/v1/rest-auth/resend_otp/`, data);
};
export const verifyOTP = (data) => {
  return API.post(`/api/v1/rest-auth/verify_otp/`, data);
};
export const changeEmail = (data: { old_email: string; new_email: string }) => {
  return API.post(`/api/v1/rest-auth/email/change/`, data);
};
export const changePassword = (data: {
  old_password: string;
  new_password: string;
}) => {
  return API.post(`/api/v1/rest-auth/password/change/`, data);
};
export const deactivateAccount = () => {
  return API.post("/api/v1/rest-auth/deactivate_account/");
};
export const joinCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/join-or-leave", data);
};
export const createCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/create", data);
};

export const joinOrLeaveCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/join-or-leave", data)
}
export const deleteCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/delete-community", data)
}
export const communityPost = (data) => {
  return API.post("/api/v1/rest-auth/community/create-community-post", data)
}
export const addMemberToCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/add-user-to-community", data)
}
export const editCommunity = (data) => {
  return API.post("/api/v1/rest-auth/community/create", data)
}
export const treatCommunityJoinRequest = (data) => {
  return API.post("/api/v1/rest-auth/community/treat-request", data)
}
export const uploadCoverImage = (data) => {
  return API.post("/api/v1/rest-auth/upload-cover-image/", data)
}
export const uploadCommunityCoverImage = (data) => {
  return API.post("api/v1/rest-auth/community/upload-community-logo", data)
}
export const searchEndpoint = (data) => {
  const formData = new FormData()
  formData.append("querystring", data)
  return API.post("/api/v1/rest-auth/make_search/", formData)
}

// PUT REQUESTS

export const editProfile = (id: string | number, data: any) => {
  return API.put(`/api/v1/rest-auth/user/${id}/`, data);
};
export const editPost = (id: string | number, data: any) => {
  return API.put(`/api/v1/rest-auth/posts/${id}/`, data);
};
export const readAllNotifications = () => {
  return API.put(`/api/v1/rest-auth/notifications/`);
};

// DELETE REQUESTS

export const deletePost = (id: string | number) => {
  return API.delete(`/api/v1/rest-auth/posts/${id}/`);
};
export const deleteAccount = (id: string | number) => {
  return API.delete(`/api/v1/rest-auth/user/${id}/`);
};
// GET REQUESTS
export const getUserDetails = (id) => {
  return API.get(`/api/v1/rest-auth/user/${id}/`);
};
export const getAllPosts = (limit) => {
  return API.get(`/api/v1/rest-auth/posts/?limit=${limit}`);
};
export const getTrendingPosts = () => {
  return API.get("/api/v1/rest-auth/trending/");
};
export const getSinglePost = (id: any) => {
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
export const likeUnlikeComment = (id) => {
  return API.get(`/api/v1/rest-auth/like_comment/${id}/`);
};
export const likeUnlikePost = (id) => {
  return API.get(`/api/v1/rest-auth/like/${id}/`);
};
export const getCommunityCategoryList = () => {
  return API.get(`api/v1/rest-auth/community/community-category-list`);
};
export const getCommunityDetail = (code) => {
  return API.get(`/api/v1/rest-auth/community/community-detail/${code}`);
};
export const getCommunityList = (category) => {
  return API.get(
    `/api/v1/rest-auth/community/community-list?limit=20${
      category ? "&category_name=" + category : ""
    }`
  );
};
export const getCommunityJoined = (limit) => {
  return API.get(
    `/api/v1/rest-auth/community/community-list?limit=${limit}&active_user=1`
  );
};
export const getCommunityPosts = (limit, code) => {
  return API.get(
    `/api/v1/rest-auth/community/community-post?limit=${limit}&code=${code}`
  );
};

export const getAccountSettings = () => {
  return API.get("/api/v1/rest-auth/accounts_settings_page/");
};
export const signOutOnAllBrowsers = () => {
  return API.get("/api/v1/rest-auth/signout_on_all_browsers/");
};
export const getSafetySettings = () => {
  return API.get("/api/v1/rest-auth/safety_settings_page/");
};
export const getFeedSettings = () => {
  return API.get("/api/v1/rest-auth/feeds_settings_page/");
};
export const getNotificationSettings = () => {
  return API.get("/api/v1/rest-auth/notification_settings_page/");
};
export const getMessageSettings = () => {
  return API.get("/api/v1/rest-auth/message_settings_page/");
};
export const togglePrivacy = () => {
  return API.get("/api/v1/rest-auth/toggle_is_private/");
};
export const toggleSearch = () => {
  return API.get("/api/v1/rest-auth/toggle_allow_search/");
};
export const toggleRecommendation = () => {
  return API.get("/api/v1/rest-auth/toggle_recommend/");
};
export const allowDiscoveryByEmail = () => {
  return API.get("/api/v1/rest-auth/toggle_allow_profile/");
};
export const randomCommunitiesPosts = () => {
  return API.get("/api/v1/rest-auth/community/post-user-communities");
};
export const getUserBySearch = (search) => {
  return API.get(`/api/v1/rest-auth/user/chat_list?query_type=users&search=${search}`)
}
export const getCommunityPost = (limit, code) => {
  return API.get(`/api/v1/rest-auth/community/community-post?limit=${limit}&code=${code}`);
};
export const getPrivateCommunityRequests = (code) => {
  return API.get(`/api/v1/rest-auth/community/list-of-requests?code=${code}`);
};
export const fetchNotifications = () => {
  return API.get(`/api/v1/rest-auth/notifications/`);
};
export const fetchConversations = () => {
  return API.get(`/api/v1/rest-auth/user_messages/fetch-user-conversations/`);
};
export const followersSearch = (user) => {
  return API.get(`/api/v1/rest-auth/user/chat_list?query_type=followers&search=${user}`);
};
export const otherUsersSearch = (username) => {
  return API.get(`/api/v1/rest-auth/user/chat_list?query_type=users&search=${username}`);
};
export const communityMembers = (code) => {
  return API.get(`/api/v1/rest-auth/community/community-members-list?code=${code}`);
};



/**
 * PAYMENTS REQUESTS
*/

export const getTransactionHistory = () => {
  return PAYMENTAPI.get(`/api/payments/fetch-user-wallet-transactions/`);
};
export const getUserWallet = () => {
  return PAYMENTAPI.get(`/api/payments/fetch-user-wallet/`);
};
export const getWithdrawalAccounts = () => {
  return PAYMENTAPI.get("/api/payments/user-withdrawal-account/")
}
export const getBankList = () => {
  return PAYMENTAPI.get("/api/payments/banks-list/")
}
export const fetchAccountName = (data) => {
  return PAYMENTAPI.post("/api/payments/fetch-account-name/", data)
}
export const addWithdrawalAccount = (data) => {
  return PAYMENTAPI.post("/api/payments/user-withdrawal-account/", data)
}
export const verifyTokenForAddingAccount = (data) => {
  return PAYMENTAPI.post("/api/payments/verify-withdrawal-account-token/", data)
}
export const initializeDeposit = (data) => {
  return PAYMENTAPI.post("/api/payments/initialize-transaction/", data)
}
export const generateTokenForAddWithdrawalAcc = () => {
  return PAYMENTAPI.get("/api/payments/generate-token-for-withdrawal-account/")
}
export const verifyTokenForAddWithdrawalAcc = (code) => {
  return PAYMENTAPI.post("/api/payments/verify-withdrawal-account-token/", code)
}
export const generateTokenForWithdrawal = () => {
  return PAYMENTAPI.get("/api/payments/generate-token-for-transfer/")
}
export const verifyTokenForWithdrawal = (code) => {
  return PAYMENTAPI.post("/api/payments/verify-token-for-initiating-transfer/", code)
}
export const makeWithdrawal = (data) => {
  return PAYMENTAPI.post("/api/payments/make-withdrawal/", data)
}
export const deleteWithdrawalAccount = (data) => {
  return PAYMENTAPI.post("/api/payments/delete-user-withdrawal-account/", data)
}
export const rewardPostWithSticker = (data) => {
  return PAYMENTAPI.post("/api/payments/rewards-coin/", data)
}
export const fetchWalletIncomeAndOutcome = () => {
  return PAYMENTAPI.get("/api/payments/fetch-income-outcome/")
}
