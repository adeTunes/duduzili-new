import API from "./axiosConfig";

export const loginUser = (data: LoginUser) => {
  return API.post("/api/v1/rest-auth/signin/", data);
};
export const registerUser = (data: RegisterUser) => {
  return API.post("/api/v1/rest-auth/signup/", data);
};
export const verifyAccount = (data: verifyAccount) => {
  return API.post("/api/v1/rest-auth/verify_account/", data);
};
