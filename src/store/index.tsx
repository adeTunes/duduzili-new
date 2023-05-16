import { atom } from "jotai";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

export const userDetails = atomWithStorage("duduzili-user", {}, storage);
export const toggleCommunityPreview = atom(true);
export const selectedMessage = atom<string | number>("");
export const numberofMessages = atom(0);
export const numberofNotifications = atom(0);
export const allPosts = atom([]);
export const userId = atom("");
export const userFollowings = atom("");
export const userFollowers = atom("");
export const friendPersonalDetails = atom({});
