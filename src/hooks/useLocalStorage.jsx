import React, { useEffect, useState } from "react";

export function useLocalStorage(initialValue) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? initialValue);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, setUser]);
  return [user, setUser];
}
