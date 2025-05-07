// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import { OAuthProvider } from "next-auth/providers"

export const authOptions = {
  providers: [
    OAuthProvider({
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      version: "2.0",
      wellKnown: "https://www.linkedin.com/.well-known/openid-configuration",
      issuer: "https://www.linkedin.com/oauth",

      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // Only ask for the OIDC scopes you’ve been approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // How to map LinkedIn’s profile response to our user object
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          // LinkedIn’s OIDC “picture” claim
          image: profile.picture,
        }
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
      })
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
