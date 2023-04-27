interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser {
  // first_name: string;
  // last_name: string;
  fullname: string;
  email: string;
  username: string;
  password: string;
}

interface verifyAccount {
  otp: "";
  email: string;
}
