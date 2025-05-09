// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "r_liteprofile",   // ← ensure ONLY this scope
        },
      },
    }),
  ],
  debug: true,               // to see errors in Vercel logs
})
