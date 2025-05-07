// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          // only the OpenID Connect scopes your app is approved to use:
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // You now get name/email/picture from token.claims
      session.user = {
        id: token.sub,
        name: session.user.name,    // from OIDC
        email: session.user.email,  // from OIDC
        image: session.user.image,  // from OIDC
      }
      return session
    },
    async jwt({ token, user, account }) {
      // On the first sign in, merge in any user/account props you want
      if (account && user) {
        token.sub = user.id
      }
      return token
    },
    async signIn({ user, account }) {
      // your upsert remains the same
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
