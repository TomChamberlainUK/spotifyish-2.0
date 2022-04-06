import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';
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

type User = {
  name: string,
  email: string,
  imageUrl: string,
  followers: number
}

export default function useGetUser(session: Session | null) {

  // Init state for tracks and artists
  const [user, setUser] = useState<User | null>(null);

  // Get recently played tracks data
  const { data, error } = useSWR(
    session
      ? ['https://api.spotify.com/v1/me/', session.accessToken]
      : null,
    fetcher
  );

  useEffect(() => {
    if (!error && data) {

      setUser({
        name: data.display_name,
        email: data.email,
        imageUrl: data.images[0].url,
        followers: data.followers.total
      });

    }
  }, [error, data]);

  return {
    user,
    error,
    isLoading: !data && !error
  }
}