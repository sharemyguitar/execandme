// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  debug: true,

  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // Accept LinkedIn’s OIDC issuer
      issuer:       "https://www.linkedin.com/oauth",

      // Only request the three OIDC scopes you have
      authorization: {
        params: { scope: "openid profile email" },
      },

      // Map the OIDC token claims into the NextAuth user
      profile(profile) {
        return {
          id:    profile.sub,
          name:  profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert your executive record
      await fetch(`${process.env.NEXTAUTH_URL}/api/executives/upsert`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          linkedInId: user.id,
          name:       user.name,
          photoUrl:   user.image,
        }),
      })
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
