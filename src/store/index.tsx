import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userDetails = atomWithStorage("duduzili-user", {});
export const toggleCommunityPreview = atom(true);
export const singleCommunity = atom("")
export const selectedMessage = atom<string>("");
export const numberofMessages = atom(0);
export const numberofNotifications = atom(0);
export const allPosts = atom([]);
export const postLimit = atom(20)
export const userId = atom("");
export const userFollowings = atom("");
export const joinedCommunities = atom({})
export const userFollowers = atom("");
export const friendPersonalDetails = atom({});
export const currentUserDetails = atom({});
export const openEditModal = atom(false)
export const verifyAccountEmail = atom("")
export const withdrawalDetails = atom({})
export const depositAmount = atom("")
export const stickerAwardee = atom("")
export const selectedFriendToChat = atom([])
export const pageSearch = atom("")
export const chatFriendOptions = atom<"selected friend" | "chat initiated" | "destroy process" | "">("")
export const socketConnection = atom(false)
export const wsReconnection = atom(false)
export const openChatDrawer = atom(false)