import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

import FullPageLoader from "../components/FullPageLoader";

const AuthContext = createContext({});

function AuthProvider(props) {
  const [authState, setAuthState] = useState({
    status: "loading",
    error: null,
    data: {},
  });

  function fetchUser(token) {
    axios
      .get("/api/v1/me.json", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("msgo_token", token);
        setAuthState((state) => ({
          ...state,
          status: "done",
          data: {
            user: res.data,
          },
        }));
      })
      .catch(() => {
        setAuthState((state) => ({
          ...state,
          status: "error",
          data: {},
        }));
        //localStorage.removeItem("msgo_token");
        //setData({});
      });
  }

  useEffect(() => {
    const cachedToken = localStorage.getItem("msgo_token");
    if (cachedToken) {
      fetchUser(cachedToken);
    } else {
      setAuthState((state) => ({
        ...state,
        status: "done",
        data: {},
      }));
    }
  }, []);

  if (authState.status === "loading") {
    return <FullPageLoader />;
  }

  const login = (email: string, password: string) => {
    axios
      .post("/oauth/token", {
        grant_type: "password",
        username: email,
        password: password,
      })
      .then((res) => {
        fetchUser(res.data.access_token);
      })
      .catch((res) =>
        setAuthState((state) => ({
          ...state,
          status: "error",
          error: "Invalid email and/or password",
        }))
      );
  };

  const register = () => {}; // register the user
  const logout = () => {
    localStorage.removeItem("msgo_token");
    setAuthState((state) => ({
      ...state,
      data: {},
    }));
  }; // clear the token in localStorage

  return (
    <AuthContext.Provider
      value={{ login, register, logout, ...authState }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
