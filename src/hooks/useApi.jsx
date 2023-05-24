import { useState, useEffect } from "react";

export function useApi(url, options) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, options);
        const json = await response.json();
        if (response.ok) {
          setData(json);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, isLoading, isError };
}
