import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import PageSkeletonLoader from 'components/Loader/SkeltonLoader/PageSkeletonLoader';
import jwt_decode from "jwt-decode";
import { CircularProgress, Box } from "@mui/material";
// import { useToast } from './ToastContext';

const loading = (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const { toastMessage } = useToast()

  const { pathname: path } = useLocation();

  const navigate = useNavigate();

  const navigateToLogin = useCallback((msg) => {
    if (!path.startsWith("/auth")) {
      navigate(`/auth/signin/${msg}?from=${path}`);
    }
  }, [navigate, path]);

  const tokenRefresh = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (checkTokenValidity(refreshToken)) {
      return fetch(process.env.REACT_APP_API_HOST + `/auth/refreshToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })
        .then((response) => {
          if (response.status === 401) {
            throw Error("Token Expired");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data.accessToken) {
            setToken(data.accessToken);
          }
          return data.accessToken;
        })
        .catch((e) => {
          setIsLoading(true);
          navigateToLogin("expired");
          setLoginStatus(false);
          setUser(null);
          setIsLoading(false);
          throw e;
        });
    } else {
      setIsLoading(true);
      navigateToLogin("expired");
      setLoginStatus(false);
      setUser(null);
      setIsLoading(false);
    }
  }, [navigateToLogin]);

  // useEffect(() => {
  //     localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

  const getUserInfo = useCallback(() => {
    fetch(process.env.REACT_APP_API_HOST + "/user/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setLoginStatus(true);
        setUser(data);
        setIsLoading(false);
      })
      .catch((e) => {
        navigateToLogin("expired");
        setLoginStatus(false);
        setUser(null);
        setIsLoading(false);
      });
  }, [navigateToLogin, token]);

  useEffect(() => {
    localStorage.setItem("token", token || "");
    if (token) {
      // setIsLoading(true);
      if (checkTokenValidity(token)) {
        getUserInfo();
      } else {
        tokenRefresh();
      }
    } else {
      // setLoginStatus(false)
      navigateToLogin("notLogged");
      setIsLoading(false);
    }
  }, [token, getUserInfo, navigateToLogin, tokenRefresh]);

  function customFetch(url, { method = "GET", headers = {}, ...rest } = {}) {
    if (checkTokenValidity(token)) {
      return fetch(process.env.REACT_APP_API_HOST + url, {
        method,
        headers: { Authorization: "Bearer " + token, ...headers },
        ...rest,
      }).then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        } else if (res.status === 400) {
          throw new Error("Bad request");
        }
        return res;
      });
    } else {
      return tokenRefresh().then((_token) => {
        return fetch(process.env.REACT_APP_API_HOST + url, {
          method,
          headers: { Authorization: "Bearer " + _token, ...headers },
          ...rest,
        })
          .then((res) => {
            if (res.status === 401) {
              throw new Error("Expired");
            }
            return res;
          })
          .catch((e) => {
            setIsLoading(true);
            setLoginStatus(false);
            navigateToLogin("expired");
            setIsLoading(false);
          });
      });
      // setIsLoading(true)
      // setLoginStatus(false)
      // navigate('/authentication/login/expired')
      // setIsLoading(false)
    }

    // if (res.status !== 200 && res.status !== 304) {
    //     throw Error('could not fetch data');
    // }
    // return await res.json();
  }

  function login(email, password, rememberMe = false) {
    return fetch(process.env.REACT_APP_API_HOST + `/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw Error("Invalid credientials");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // if (data.status) {
        setIsLoading(true);
        setUser(data.user);
        setToken(data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("streamToken", data.streamToken);
        // toastMessage("Logged in successfully")
        // }
        return () => {
          setLoginStatus(true);
          setIsLoading(false);
        };
      })
      .catch((e) => {
        // toastMessage("Login unsuccessfull")
        console.log(e.message); //Failed to fetch
        throw e;
      });
  }

  function logout() {
    navigateToLogin("loggedOut");
    setUser(null);
    setToken(null);
    setLoginStatus(false);
    localStorage.removeItem("refreshToken");
    // toastMessage("Logged out successfully")
    return true;
  }

  function checkTokenValidity(token) {
    if (!token || typeof token !== "string" || token.trim() === "") {
      return false;
    }

    try {
      let decodedToken = jwt_decode(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  }

  const value = {
    user,
    login,
    logout,
    customFetch,
    loginStatus,
    getUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}