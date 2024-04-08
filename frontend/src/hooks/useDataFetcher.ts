import { useState } from 'react';

interface FetchOptions extends RequestInit {
  body?: any;
}

const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (
    url: string | URL | Request,
    options: FetchOptions = {}
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: options.method ?? 'GET',
        headers: options.headers ?? {},
        body: options.body ? JSON.stringify(options.body) : null,
      });

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Fetch error', error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useDataFetcher;
