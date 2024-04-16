import { useState } from 'react';

interface FetchOptions extends RequestInit {
  body?: any;
}

const useJwtFetcher = <T>() => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const securedFetch = async (
    url: string | URL | Request,
    token: string,
    options: FetchOptions = {}
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: options.method ?? 'GET',
        headers: {
          ...options.headers,
          Authorization: 'Bearer ' + token,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });

      const jsonData = await response.json();
      setData(jsonData);
      return jsonData;
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, securedFetch };
};

export default useJwtFetcher;
