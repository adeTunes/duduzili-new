import React, { createContext, useState } from "react";

type Data = {
  userID: string | number;
  setUserId: React.Dispatch<React.SetStateAction<string | number>>;
};

export const UserContext = createContext<Data>(null);
function UserProvider({ children }) {
  const [userID, setUserId] = useState<string | number>(null);
  const userData = {
    userID,
    setUserId,
  };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
