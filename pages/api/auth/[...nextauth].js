// File: pages/api/auth/[...nextauth].js

import NextAuth from "next-auth"
import OIDCProvider from "next-auth/providers/oidc"

export default NextAuth({
  // turn on debug logging while you verify
  debug: true,

  // supply a NEXTAUTH_SECRET in your env
  secret: process.env.NEXTAUTH_SECRET,

  // configure your LinkedIn OIDC provider
  providers: [
    OIDCProvider({
      id: "linkedin",
      name: "LinkedIn",

      // LinkedIn’s v2 OIDC issuer & discovery URL
      issuer:   "https://www.linkedin.com/oauth/v2",
      wellKnown:
        "https://www.linkedin.com/oauth/v2/.well-known/openid-configuration",

      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // request the OIDC scopes you’ve been granted
      authorization: {
        params: {
          scope: "openid profile email"
        }
      },

      // enforce PKCE + state checks
      checks: ["pkce", "state"]
    })
  ],

  // custom logger so you can see exactly what’s happening
  logger: {
    error(code, ...rest) {
      console.error("NextAuth Error:", code, ...rest)
    },
    warn(code, ...rest) {
      console.warn("NextAuth Warn:", code, ...rest)
    },
    debug(code, ...rest) {
      console.debug("NextAuth Debug:", code, ...rest)
    }
  },

  // persist the access token in the JWT & session if you need it
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      return session
    }
  }
})
