import { createContext, useState } from "react";

const IsLoginContext = createContext({
  isLogin: true,
  setIsLogin: function () {},
});

export function IsLoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);

  function handleIsSetLogin(loginState) {
    setIsLogin(loginState);
  }

  const context = {
    isLogin: isLogin,
    setIsLogin: handleIsSetLogin,
  };

  return (
    <IsLoginContext.Provider value={context}>
      {children}
    </IsLoginContext.Provider>
  );
}

export default IsLoginContext;
