import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userDetails = atomWithStorage("duduzili-user", {});
export const toggleCommunityPreview = atom(true);
export const selectedMessage = atom<string | number>("");
export const numberofMessages = atom(0);
export const numberofNotifications = atom(0);
export const allPosts = atom([]);
export const postLimit = atom(20)
export const userId = atom("");
export const userFollowings = atom("");
export const userFollowers = atom("");
export const friendPersonalDetails = atom({});
export const openEditModal = atom(false)
export const verifyAccountEmail = atom("")
export const withdrawalDetails = atom({})
export const depositAmount = atom("")
