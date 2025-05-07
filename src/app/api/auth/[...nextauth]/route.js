// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🔒 Only ask for the OIDC scopes your app has approval for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // Map the ID token / OIDC profile into NextAuth's User
      profile(profile) {
        return {
          // 'sub' is the standard OIDC user ID
          id: profile.sub,
          // name/email/picture are returned by the OIDC endpoint
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert your executive record in your own DB
      await fetch(`${process.env.NEXTAUTH_URL}/api/executives/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedInId: user.id,
          name: user.name,
          photoUrl: user.image,
        }),
      });
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
