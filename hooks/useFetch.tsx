import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

// Prepare fetcher for useSWR
async function fetcher(url: string, accessToken: string) {
  
  // Fetch data
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  // Handle errors
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(`An error occurred whilst fetching data: (${error.status}) ${error.message}`);
  }

  // Parse and return data
  const data = await response.json();
  return data;

}

export default function useFetch(url: string) {

  // Get user session
  const { data: session } = useSession();

  // Get data and/or errors
  const { data, error } = useSWR(
    // Only make requests if session is valid
    session
      ? [url, session.accessToken]
      : null,
    fetcher
  );

  // Handle errors
  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

  // Return data and any errors
  return {
    data,
    error,
    isLoading: !data && !error
  }
}