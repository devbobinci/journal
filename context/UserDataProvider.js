import { createContext, useState } from "react";

const UserDataContext = createContext({
  userData: {},
  setLoader: function () {},
});

export function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  function handleUserData(userDataState) {
    setUserData(userDataState);
  }

  const context = {
    userData: userData,
    setUserData: handleUserData,
  };

  return (
    <UserDataContext.Provider value={context}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContext;
