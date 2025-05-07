// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  // turn on verbose logs during troubleshooting
  debug: true,

  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // Accept LinkedIn’s OIDC issuer so NextAuth will validate the ID token
      issuer:       "https://www.linkedin.com/oauth",

      // Only request the OpenID Connect scopes your app already has approved
      authorization: {
        params: { scope: "openid profile email" },
      },

      // Map the OIDC ID token claims into the NextAuth user object
      profile(profile) {
        return {
          id:    profile.sub,      // OIDC subject
          name:  profile.name,     // OIDC full name
          email: profile.email,    // OIDC email
          image: profile.picture,  // OIDC picture URL
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
