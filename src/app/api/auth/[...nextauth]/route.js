// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🚀 Only request the OpenID Connect scopes your app is approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // Map the OIDC claims into the shape NextAuth expects
      profile(profile) {
        return {
          id: profile.sub,       // the OIDC “subject” claim
          name: profile.name,    // the combined name
          email: profile.email,  // you’ll get this if you requested `email`
          image: profile.picture // LinkedIn’s OIDC picture URL
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // upsert into your own DB
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
