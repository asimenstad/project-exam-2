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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const removeError = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(removeError);
    };
  }, [error]);

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
        const { errors } = await response.json();
        setError(errors[0].message);
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
        const { errors } = await response.json();
        setError(errors[0].message);
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

  return { login, register, logout, user, error, isError, isLoading };
}
