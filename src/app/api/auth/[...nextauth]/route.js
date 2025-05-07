// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🔒 Only request the OpenID Connect scopes your LinkedIn app is approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // Map LinkedIn’s OIDC profile shape into NextAuth’s User
      profile(profile) {
        return {
          id: profile.sub, // OIDC “subject” claim
          name: profile.name,
          email: profile.email,
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
