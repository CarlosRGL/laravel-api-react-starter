import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  searchEnable: false,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setSearchEnable: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [notification, _setNotification] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [searchEnable, setSearchEnable] = useState(false);

  const setNotification = (notification) => {
    _setNotification(notification);
    setTimeout(() => {
      _setNotification(null);
    }, 3000);
  };

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        notification,
        searchEnable,
        setUser,
        setToken,
        setNotification,
        setSearchEnable,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
