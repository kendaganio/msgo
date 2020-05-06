import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

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
        setLoading(false);
        setData((data) => ({
          ...data,
          user: res.data,
        }));
      })
      .catch((res) => {
        setLoading(false);
        //localStorage.removeItem("msgo_token");
        //setData({});
      });
  }

  useEffect(() => {
    const cachedToken = localStorage.getItem("msgo_token");
    if (cachedToken) {
      fetchUser(cachedToken);
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return "loading";
  }

  const login = (email, password) => {
    axios
      .post("/oauth/token", {
        grant_type: "password",
        username: email,
        password: password,
      })
      .then((res) => {
        fetchUser(res.data.access_token);
      })
      .catch((res) => console.log(res));
  };

  const register = () => {}; // register the user
  const logout = () => {
    localStorage.removeItem("msgo_token");
    setData({});
  }; // clear the token in localStorage

  return (
    <AuthContext.Provider
      value={{ data, login, register, logout }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
