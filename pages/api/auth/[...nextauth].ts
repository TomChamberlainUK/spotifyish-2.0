import type { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: JWT) {
  try {

    // Configure spotify url for refreshing token
    const url = 'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID ?? '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken ?? ''
      });
    
    // Attempt to retrieve token
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });

    const refreshedTokens = await response.json();

    // Handle bad responses
    if (!response.ok) {
      throw refreshedTokens;
    }
    
    // Return refreshed token
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in * 1000), // expires_in is in seconds, convert to ms
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };

  } catch (error) {

    console.error(error);

    return {
      ...token,
      error: 'Refresh Access Token Error'
    }
    
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
          scope: [
            'user-read-email',
            'user-read-recently-played',
            'user-library-read',
            'user-top-read'
          ].join(',')
        }),
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {

    async jwt({ token, user, account }) {

      // Initial sign in
      if (account && user) {

        // Add access token to JWT
        token.accessToken = account.access_token;

        // If an expiry time and refresh token are available, add to JWT
        if (account.refresh_token && account.expires_at) {
          token.accessTokenExpires = account.expires_at * 1000;
          token.refreshToken = account.refresh_token;
        }

        return token;
        
      }

      // If we know that the token has expired, attempt to refresh it
      if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires) {
        return refreshAccessToken(token);
      }

      // Else just return the token
      return token;

    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
});