import { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';

type User = {
  name: string,
  email: string,
  imageUrl: string,
  followers: number
}

export default function useGetUser() {

  // Init state for user
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data
  const { data, error, isLoading } = useFetch('https://api.spotify.com/v1/me/');

  // If data was successfully fetched
  useEffect(() => {
    if (!error && data) {

      // Update user state
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
    isLoading
  }
}