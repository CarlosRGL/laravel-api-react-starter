import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  users: [],
  notification: null,
  setUser: () => {},
  setUsers: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [notification, _setNotification] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

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
        user,
        setUser,
        setToken,
        setUsers,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
