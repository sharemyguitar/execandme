// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // Accept LinkedIn’s OIDC issuer so the ID token is validated correctly
      issuer:       "https://www.linkedin.com/oauth",

      // Only ask for the OpenID Connect scopes your app has been approved for
      authorization: {
        params: { scope: "openid profile email" },
      },

      // Map the OIDC claims into NextAuth’s user object
      profile(profile) {
        return {
          id:    profile.sub,                   // OIDC “subject”
          name:  profile.name,                  // OIDC “name”
          email: profile.email,                 // OIDC “email”
          image: profile.picture,               // OIDC “picture”
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert the executive into your database
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
