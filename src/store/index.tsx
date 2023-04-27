import { atom } from "jotai";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

export const userDetails = atomWithStorage("duduzili-user", {}, storage);
export const toggleCommunityPreview = atom(true);
