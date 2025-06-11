import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Setup axios default headers for Authorization if token exists
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      // Fetch user info from API
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/users/`)
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            // If no success, logout (clear token)
            logout();
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);

    // Fetch user info after login
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/users/`)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          logout();
        }
      })
      .catch(() => logout());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
