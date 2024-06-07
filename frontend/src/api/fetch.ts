import { useState, useEffect } from "react";

export const useFetch = <T>(fn: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => setIsLoading(true), []);

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        try {
          setData((await fn()) as T);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isLoading, fn]);

  return { isLoading, isError, data, refetch: () => setIsLoading(true) };
};
