import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // ✅ Move logout above useEffect
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/users/`)
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [logout]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/users/`)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          logout();
        }
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
