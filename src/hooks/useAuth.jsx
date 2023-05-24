import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function login(data, url) {
    try {
      setIsLoading(true);
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
        navigate("/profile");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(data, url) {
    try {
      setIsLoading(true);
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      if (response.ok) {
        navigate("/login");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  async function authFetch(data, method, url) {
    try {
      setIsLoading(true);
      const postData = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
      } else {
        const error = await response.json();
        console.log(error);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function authDelete(url) {
    try {
      setIsLoading(true);
      const postData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const response = await fetch(url, postData);
      if (response.ok) {
        navigate("/profile");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { login, register, logout, authFetch, authDelete, user, isError, isLoading };
}
